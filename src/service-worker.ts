/// <reference lib="ES2015" />
/// <reference lib="webworker" />

// @ts-ignore
const sw = self as ServiceWorkerGlobalScope;

const CacheName = {
  runtime3: 'runtime-v2',
  sources: 'sources-v4',
  assets: 'assets-v4',
};

// A list of local resources we always want to be cached.
const OUTPUT_INFO_URL = './output-info.json';
const PRECACHE_URLS = ['./', './home', './vendors'];

interface OutputInfoShape {
  files: string[];
  assets: string[];
}

const isOutputInfoShape = (data: unknown): data is OutputInfoShape =>
  Boolean(data) &&
  Object.prototype.hasOwnProperty.call(data, 'files') &&
  Array.isArray((data as { files: unknown }).files);

const fetchOutputInfoData = () =>
  fetch(OUTPUT_INFO_URL)
    .then((data) => data.json())
    .then((data: unknown) => {
      if (isOutputInfoShape(data)) {
        return data;
      } else {
        throw new Error('Failed to parse data');
      }
    });

const precacheStrategy = {
  html: () => Promise.all(PRECACHE_URLS.map((url) => caches.open(CacheName.sources).then((cache) => cache.add(url)))),
  jsCssHtml: () =>
    Promise.all(PRECACHE_URLS.map((url) => caches.open(CacheName.sources).then((cache) => cache.add(url))))
      .then(() => fetchOutputInfoData())
      .then((data) => {
        return Promise.all(data.files.map((url) => caches.open(CacheName.sources).then((cache) => cache.add(url))));
      })
      .catch((error) => {
        console.error(`Error on precaching :: ${error.String()}`);
      }),
  jsCssHtmlAssets: () =>
    Promise.all(PRECACHE_URLS.map((url) => caches.open(CacheName.sources).then((cache) => cache.add(url))))
      .then(() => fetchOutputInfoData())
      .then((data) => {
        return Promise.all([
          ...data.files.map((url) => caches.open(CacheName.sources).then((cache) => cache.add(url))),
          ...data.assets.map((url) => caches.open(CacheName.sources).then((cache) => cache.add(url))),
        ]);
      })
      .catch((error) => {
        console.error(`Error on precaching :: ${error.String()}`);
      }),
} satisfies Record<string, () => Promise<void | void[]>>;

// The install handler takes care of precaching the resources we always need.
sw.addEventListener('install', () => {});

sw.addEventListener('activate', (event) => {
  console.warn(`Activate`);
  void precacheStrategy.jsCssHtml();

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          console.warn(`Checking cache :: ${key}`);
          if (key !== CacheName.sources) {
            console.warn(`Deleting cache :: ${key}`);
            return caches.delete(key);
          }
          return Promise.resolve();
        })
      )
    )
  );
});

const cacheStrategy = {
  alwaysCacheResponse: ({ request }, cacheName) =>
    caches.match(request, { ignoreSearch: true }).then((cachedResponse) =>
      caches
        .open(CacheName[cacheName])
        .then((cache) =>
          fetch(request).then((response) =>
            Promise.resolve()
              .then(() => cache.delete(request, { ignoreSearch: true }))
              .then(() => {
                return cache.put(request, response.clone());
              })
              .then(() => response)
          )
        )
        .catch((error) => {
          if (cachedResponse) {
            console.info(`Serving cached version :: ${request.url} :: ${cacheName}`);
            return cachedResponse;
          }

          console.error(
            `Failed to retrieve cache on ${request.url} :: originalError :: ${error.toString()} :: ${cacheName}`
          );
          throw new Error(error);
        })
    ),
  cacheResponseOnlyWhenMissing: ({ request }, cacheName) =>
    caches.match(request, { ignoreSearch: true }).then((cachedResponse) =>
      caches
        .open(CacheName[cacheName])
        .then((cache) =>
          fetch(request).then(async (response) => {
            if (!cachedResponse) {
              await cache.delete(request, { ignoreSearch: true });
              await cache.put(request, response.clone());
            }
            return response;
          })
        )
        .catch((error) => {
          if (cachedResponse) {
            console.info(`Serving cached version :: ${request.url} :: ${cacheName}`);
            return cachedResponse;
          }

          console.error(
            `Failed to retrieve cache on ${request.url} :: originalError :: ${error.toString()} :: ${cacheName}`
          );
          throw new Error(error);
        })
    ),
} satisfies Record<string, (event: FetchEvent, cacheName: keyof typeof CacheName) => Promise<Response>>;

sw.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(self.location.origin) && !event.request.url.includes('esbuild-livereload')) {
    if (event.request.url.includes('/assets/')) {
      return event.respondWith(cacheStrategy.cacheResponseOnlyWhenMissing(event, 'assets'));
    }

    event.respondWith(cacheStrategy.alwaysCacheResponse(event, 'sources'));
  }
});

export {};
