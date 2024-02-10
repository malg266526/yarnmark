import { htmlPlugin } from '@jgoz/esbuild-plugin-html';

export const config = {
  entryPoints: ['./src/index.tsx'],
  sourcemap: true,
  bundle: true,
  outdir: 'dist',
  treeShaking: true,
  target: 'es2019',
  metafile: true,
  plugins: [
    htmlPlugin({
      template: './src/index.html',
      scriptPlacement: ''
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
