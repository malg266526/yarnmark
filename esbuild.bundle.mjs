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
      // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
      // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
      resolveFrom: 'cwd',
      assets: {
        from: ['./_redirects'],
        to: ['./dist'],
      },
      watch: true,
    }),
  ]
});

if (args.metafile) {
  fs.writeFileSync(args.metafile, JSON.stringify(metafileData))
}

