import { htmlPlugin } from '@craftamap/esbuild-plugin-html';
import { copy } from 'esbuild-plugin-copy';
import manifestPlugin from 'esbuild-plugin-manifest';

const entryPoints = ['src/index.tsx', 'src/service-worker.ts', 'src/service-worker-loader.ts']

export const appConfig = {
  entryPoints,
  entryNames: '[name]',
  bundle: true,
  outdir: 'dist/',
    sourcemap: 'inline',
  treeShaking: true,
  target: 'es2019',
  metafile: true,
  assetNames: '/assets/[name]-[hash]',
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
      files: [{
        define: {
          hash: new Date().getTime().toString(),
        },
        htmlTemplate: 'public/index.html',
        filename: 'index.html',
        entryPoints: entryPoints.filter(entry => !entry.includes('service-worker')),
        hash: false,
      }],
    }),
    manifestPlugin({
      filename: 'output-info.json',
      generate: (obj) => {
        return {
          files: Object
            .entries(obj)
            .map(([, realName]) => realName.replace('dist', '.')).filter((entry) => !entry.includes('assets') && !entry.includes('.map')).filter(entry => !entry.includes('service-worker')),
          assets: Object
            .entries(obj)
            .map(([, realName]) => realName.replace('dist', '.')).filter((entry) => entry.includes('assets'))
        };
      }
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
