/// <reference lib="ES2015" />
/// <reference lib="webworker" />

// @ts-ignore
const sw = self as ServiceWorkerGlobalScope;

const CacheName = {
  runtime: 'runtime-v2'
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
  html: () => Promise.all(PRECACHE_URLS.map((url) => caches.open(CacheName.runtime).then((cache) => cache.add(url)))),
  jsCssHtml: () =>
    Promise.all(PRECACHE_URLS.map((url) => caches.open(CacheName.runtime).then((cache) => cache.add(url))))
      .then(() => fetchOutputInfoData())
      .then((data) => {
        return Promise.all(data.files.map((url) => caches.open(CacheName.runtime).then((cache) => cache.add(url))));
      })
      .catch((error) => {
        console.error(`Error on precaching :: ${error.String()}`);
      }),
  jsCssHtmlAssets: () =>
    Promise.all(PRECACHE_URLS.map((url) => caches.open(CacheName.runtime).then((cache) => cache.add(url))))
      .then(() => fetchOutputInfoData())
      .then((data) => {
        return Promise.all([
          ...data.files.map((url) => caches.open(CacheName.runtime).then((cache) => cache.add(url))),
          ...data.assets.map((url) => caches.open(CacheName.runtime).then((cache) => cache.add(url)))
        ]);
      })
      .catch((error) => {
        console.error(`Error on precaching :: ${error.String()}`);
      })
} satisfies Record<string, () => Promise<void | void[]>>;

// The install handler takes care of precaching the resources we always need.
sw.addEventListener('install', () => {
  sw.skipWaiting();
  void precacheStrategy.jsCssHtml();
});

sw.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CacheName.runtime) {
            return caches.delete(key);
          }
          return Promise.resolve();
        })
      )
    )
  );
});

const respondStrategy = {
  networkFirst: ({ request }) =>
    caches.match(request, { ignoreSearch: true }).then((cachedResponse) =>
      caches.open(CacheName.runtime).then((cache) =>
        fetch(request)
          .then((response) =>
            Promise.resolve()
              .then(() => cache.delete(request, { ignoreSearch: true }))
              .then(() => cache.put(request, response.clone()).then(() => response))
          )
          .catch((error) => {
            if (cachedResponse) {
              console.info(`Serving cached version :: ${request.url}`);
              return cachedResponse;
            }

            console.error(`Failed to retrieve cache on ${request.url} :: originalError :: ${error.toString()}`);
            throw new Error(error);
          })
      )
    ),
  cacheFirst: ({ request }) =>
    caches.match(request).then((cachedResponse) =>
      caches.open(CacheName.runtime).then((cache) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((response) => cache.put(request, response.clone()).then(() => response));
      })
    )
} satisfies Record<string, (event: FetchEvent) => Promise<Response>>;

sw.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(respondStrategy.networkFirst(event));
  }
});

export {};
