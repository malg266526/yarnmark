import * as esbuild from 'esbuild';
import fs from 'fs';
import { config } from './esbuild.config.mjs';
import argv from 'argv';

const args = argv
  .option([
    {
      name: 'metafile',
      type: 'string'
    }
  ])
  .run(process.argv).options;

const metafileData = await esbuild.build({
  ...config,
  minify: true
});

if (args.metafile) {
  fs.writeFileSync(args.metafile, JSON.stringify(metafileData));
}
