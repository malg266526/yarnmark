if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    if (navigator.serviceWorker.controller) {
      console.info('SW already present');
    }

    navigator.serviceWorker.oncontrollerchange = () => {
      console.info('controllerchange:1', navigator.serviceWorker.controller);
    };

    console.info('resgitering');
    navigator.serviceWorker.register('/service-worker.js');
    // .then((registered) => {
    //   console.info('reg:1', registered.active, registered.installing, navigator.serviceWorker.controller);

    //   navigator.serviceWorker.controller?.addEventListener('message', (event) => {
    //     console.error(`ServiceWorker message :: ${event.toString()}`);
    //   });
    //   navigator.serviceWorker.controller?.addEventListener('error', (event) => {
    //     console.info(`ServiceWorker error :: ${event.toString()}}`);
    //   });
    // });
  });
}
