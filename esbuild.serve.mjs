import { config } from './esbuild.config.mjs';
import { createServer } from 'esbuild-server';

createServer({
  ...config,
  sourcemap: true
}, {
  port: 8090,
  open: true,
  injectLiveReload: true,
  static: 'dist',
  historyApiFallback: true,
  sourcemap: 'inline'
}).start();
