/// <reference lib="ES2015" />
/// <reference lib="webworker" />

// @ts-ignore
const sw = self as ServiceWorkerGlobalScope;

const createClientLogger = (limit: number) => {
  const logs: string[] = [];

  const cacheLog = (message: string) => {
    if (logs.length >= limit) {
      logs.shift();
    }
    logs.push(message);
    return logger;
  };

  const sendMessageToClient = (client: Client | MessagePort | ServiceWorker, message: string) => {
    client.postMessage({ type: 'log', message });
  };

  const logger = {
    info: function (message: string) {
      cacheLog(message);
    },

    getCachedLogs: () => logs,
    sendToClient: (client: Client | MessagePort | ServiceWorker) => {
      if (logs.length) {
        while (logs.length) {
          sendMessageToClient(client, logs.shift()!);
        }
      }
    }
  };

  return logger;
};

const clientLogger = createClientLogger(50);

const CacheName = {
  preload: 'precache-v1',
  runtime: 'runtime'
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
        clientLogger.info(`fetchOutputInfoData :: ${data.toString()}`);
        return data;
      } else {
        clientLogger.info(`fetchOutputInfoData :: failed to parse data :: ${data?.toString()}`);
        throw new Error('Failed to parse data');
      }
    });

const precacheStrategy = {
  html: () => Promise.all(PRECACHE_URLS.map((url) => caches.open(CacheName.preload).then((cache) => cache.add(url)))),
  jsCssHtml: () =>
    Promise.all(PRECACHE_URLS.map((url) => caches.open(CacheName.preload).then((cache) => cache.add(url))))
      .then(() => fetchOutputInfoData())
      .then((data) => {
        return Promise.all(data.files.map((url) => caches.open(CacheName.preload).then((cache) => cache.add(url))));
      })
      .catch((error) => {
        clientLogger.info(`Error on precaching :: ${error.String()}`);
      }),
  jsCssHtmlAssets: () =>
    Promise.all(PRECACHE_URLS.map((url) => caches.open(CacheName.preload).then((cache) => cache.add(url))))
      .then(() => fetchOutputInfoData())
      .then((data) => {
        return Promise.all([
          ...data.files.map((url) => caches.open(CacheName.preload).then((cache) => cache.add(url))),
          ...data.assets.map((url) => caches.open(CacheName.preload).then((cache) => cache.add(url)))
        ]);
      })
      .catch((error) => {
        clientLogger.info(`Error on precaching :: ${error.String()}`);
      })
} satisfies Record<string, () => Promise<void | void[]>>;

// The install handler takes care of precaching the resources we always need.
sw.addEventListener('install', (event) => {
  clientLogger.info(`ServiceWorker:install`);
  event.waitUntil(
    cleanAllCache([CacheName.preload, CacheName.runtime]).then(() =>
      precacheStrategy.jsCssHtml().then(() => sw.skipWaiting())
    )
  );
});

sw.addEventListener('activate', () => {
  clientLogger.info(`ServiceWorker:activate`);
});

function cleanAllCache(cacheNames: string[]) {
  return Promise.all(cacheNames.map((name) => caches.delete(name)));
}

function getAllCacheKeys(cacheName: string) {
  return caches.open(cacheName).then((cache) => cache.keys());
}

type WindowClientMessage =
  | {
      type: 'log';
      variant: 'cacheKeys';
    }
  | { type: 'cleanCache' }
  | { type: 'get-logs' };

sw.addEventListener(
  'message',
  (event: { data: WindowClientMessage; source: Client | null | ServiceWorker | MessagePort }) => {
    if (event.data.type === 'get-logs') {
      if (event?.source) {
        event?.source?.postMessage({ type: 'get-logs-reponse' });
        clientLogger.sendToClient(event.source);
      }
    }

    if (event.data.type === 'cleanCache') {
      void cleanAllCache([CacheName.preload, CacheName.runtime]);
    }

    if (event.data.type === 'log') {
      if (event.data.variant === 'cacheKeys') {
        caches.open(CacheName.runtime).then((cache) => {
          cache.keys().then((keys) => {
            event?.source?.postMessage({ cacheKeys: keys.map((value) => value.url) });
          });
        });
      }
      return;
    }
  }
);

const cacheStrategy = {
  networkFirst: (request) =>
    caches.match(request).then((cachedResponse) =>
      caches.open(CacheName.runtime).then((cache) =>
        fetch(request)
          .then((response) => cache.put(request, response.clone()).then(() => response))
          .catch((error) => {
            if (cachedResponse) {
              clientLogger.info(`Serving cached version :: ${request.url}`);
              return cachedResponse;
            }

            return Promise.all([getAllCacheKeys(CacheName.preload), getAllCacheKeys(CacheName.runtime)]).then(
              ([k1, k2]) => {
                clientLogger.info(
                  `Failed to retrieve cache on home / index :: ${k1.toString()} :: ${k2.toString()} :: originalError :: ${error.toString()}`
                );
                throw new Error(
                  `Failed to retrieve cache on home / index :: ${k1.toString()} :: ${k2.toString()} :: originalError :: ${error.toString()}`
                );
              }
            );
          })
      )
    ),
  cacheFirst: (request) =>
    caches.match(request).then((cachedResponse) =>
      caches.open(CacheName.runtime).then((cache) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((response) => cache.put(request, response.clone()).then(() => response));
      })
    )
} satisfies Record<string, (request: Request) => Promise<Response>>;

sw.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(cacheStrategy.networkFirst(event.request));
  }
});

export {};
