import { config } from './esbuild.config.mjs';
import { createServer } from 'esbuild-server';

createServer({
  sourcemap: true,
  ...appConfig,
},
  {
    port: 8090,
    open: true,
    injectLiveReload: true,
    static: 'dist',
    historyApiFallback: true,
    sourcemap: 'inline',
  }
).start();
