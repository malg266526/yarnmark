if ('serviceWorker' in navigator) {
  if (navigator.serviceWorker.controller) {
    console.info('SW already present');
  }

  navigator.serviceWorker.register('/service-worker.js');
}
