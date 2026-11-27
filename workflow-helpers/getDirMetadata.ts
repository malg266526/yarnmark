import fs from 'fs';
import argv from 'argv';
import { Metadata } from './types';

const { dir, out, extensions } = argv
  .option([
    {
      name: 'dir',
      type: 'string'
    },
    {
      name: 'out',
      type: 'string'
    },
    {
      name: 'extensions',
      type: 'csv,string'
    }
  ])
  .run(process.argv).options;

console.warn('extensions', extensions);

const asyncStat = async (filename: string) =>
  new Promise<{ size: number }>((resolve, reject) => {
    fs.stat(filename, (error: unknown, stats: { size: number }) => {
      if (error) {
        reject(error);
      }

      resolve(stats);
    });
  });

const extensionRegex = /(.*)(\.[^\.]*)$/;
const viteContentHashRegex = /-[A-Za-z0-9_-]{8}(?=\.[^./]+$)/;

const removeContentHash = (filename: string) => filename.replace(viteContentHashRegex, '');

const getFilesDataFromDir = async ({ path, extensions }: { path: string; extensions: string[] }): Promise<Metadata> => {
  const directory = fs.readdirSync(path, { encoding: 'utf8', recursive: true });
  const metadata = {} as Record<string, number>;

  for await (const filename of directory) {
    if (extensions.includes(filename.replace(extensionRegex, '$2'))) {
      const { size } = await asyncStat(`${path}/${filename}`);
      const name = removeContentHash(filename);
      metadata[name] = (metadata[name] ?? 0) + size;
    }
  }

  return metadata;
};

const result = await getFilesDataFromDir({ path: dir, extensions });

if (out) {
  fs.writeFileSync(out, JSON.stringify(result));
}

export {};
