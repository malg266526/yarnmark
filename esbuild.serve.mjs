import { config } from './esbuild.config.mjs';
import { createServer } from 'esbuild-server'

createServer(config,
    {
        port: 8090,
        open: true,
        injectLiveReload: true,
        static: 'dist',
    }
).start();
