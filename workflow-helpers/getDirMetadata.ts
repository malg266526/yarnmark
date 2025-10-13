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

const getFilesDataFromDir = async ({ path, extensions }: { path: string; extensions: string[] }): Promise<Metadata> => {
  const directory = fs.readdirSync(path, { encoding: 'utf8' }) as string[];
  const metadata = {} as Record<string, number>;

  for await (const filename of directory) {
    if (extensions.includes(filename.replace(extensionRegex, '$2'))) {
      const { size } = await asyncStat(`${path}/${filename}`);
      metadata[filename] = size;
    }
  }

  return metadata;
};

const result = await getFilesDataFromDir({ path: dir, extensions });

if (out) {
  fs.writeFileSync(out, JSON.stringify(result));
}

export {};
