import { htmlPlugin } from '@craftamap/esbuild-plugin-html';
import { copy } from 'esbuild-plugin-copy';

const entryPoints = ['src/index.tsx'];

export const config = {
  entryPoints,
  bundle: true,
  outdir: 'dist',
  treeShaking: true,
  target: 'es2019',
  metafile: true,
  plugins: [
    copy({
      resolveFrom: 'cwd',
      assets: {
        from: ['./public/*'],
        to: ['./dist']
      },
      watch: true
    }),
    htmlPlugin({
      files: [
        {
          define: {
            hash: new Date().getTime().toString()
          },
          filename: 'index.html',
          entryPoints,
          htmlTemplate: 'public/index.html',
          hash: true
        }
      ]
    })
  ],
  loader: {
    '.png': 'file',
    '.jpg': 'file',
    '.svg': 'file',
    '.jpeg': 'file',
    '.webp': 'file',
    '.avif': 'file',
    '.jfif': 'file',
    '.woff': 'file',
    '.ttf': 'file',
    '.eot': 'file'
  }
};
