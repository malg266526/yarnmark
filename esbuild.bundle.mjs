import * as esbuild from 'esbuild'
import fs from 'fs';
import { config } from './esbuild.config.mjs';
import argv from 'argv';
import { copy } from 'esbuild-plugin-copy';

const args = argv.option([
  {
    name: 'metafile',
    type: 'string'
  }
]).run(process.argv).options;

const metafileData = await esbuild.build({
  ...config,
  plugins: [
    ...config.plugins,
    copy({
      resolveFrom: 'cwd',
      assets: {
        from: ['./_redirects'],
        to: ['./dist'],
      },
      watch: true,
    }),
    copy({
      resolveFrom: 'cwd',
      assets: {
        from: ['./public/*'],
        to: ['./dist'],
      },
      watch: true,
    }),
  ]
});

if (args.metafile) {
  fs.writeFileSync(args.metafile, JSON.stringify(metafileData))
}

