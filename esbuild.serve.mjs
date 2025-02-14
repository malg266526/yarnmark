import { appConfig } from './esbuild.config.mjs';
import { createServer } from 'esbuild-server'

createServer({
  ...appConfig,
  sourcemap: true
},
  {
    port: 8091,
    open: true,
    injectLiveReload: true,
    static: 'dist',
    historyApiFallback: true,
    sourcemap: 'inline'
  }
).start();
