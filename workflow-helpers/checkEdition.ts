import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { findEditionMarkers, type EditionMarker } from '../src/edition/editionCheckUtils.ts';
import { EDITION_CHECK_ALLOWLIST } from '../src/edition/editionCheckAllowlist.ts';

const ROOT_DIR = process.cwd();
const SOURCE_DIR = join(ROOT_DIR, 'src');
const SCANNED_EXTENSIONS = ['.ts', '.tsx'];
const EXCLUDED_PATH_FRAGMENTS = [
  '/tests/',
  '.test.',
  'Mock',
  'Fixture',
  '.styled.',
  'src/edition/',
  'fairEditionConfig'
];

const toProjectPath = (absolutePath: string) => relative(ROOT_DIR, absolutePath).split(sep).join('/');

const listSourceFiles = (directory: string): string[] =>
  readdirSync(directory).flatMap((entry) => {
    const entryPath = join(directory, entry);

    if (statSync(entryPath).isDirectory()) {
      return listSourceFiles(entryPath);
    }

    const projectPath = toProjectPath(entryPath);
    const isScanned = SCANNED_EXTENSIONS.some((extension) => projectPath.endsWith(extension));
    const isExcluded = EXCLUDED_PATH_FRAGMENTS.some((fragment) => projectPath.includes(fragment));

    return isScanned && !isExcluded ? [projectPath] : [];
  });

const markers: EditionMarker[] = listSourceFiles(SOURCE_DIR).flatMap((filePath) =>
  findEditionMarkers(filePath, readFileSync(join(ROOT_DIR, filePath), 'utf8'), EDITION_CHECK_ALLOWLIST)
);

const markersByFile = new Map<string, EditionMarker[]>();

for (const marker of markers) {
  markersByFile.set(marker.filePath, [...(markersByFile.get(marker.filePath) ?? []), marker]);
}

for (const [filePath, fileMarkers] of markersByFile) {
  console.log(`\n${filePath}`);

  for (const marker of fileMarkers) {
    console.log(`  ${marker.line}: [${marker.match}] ${marker.text.slice(0, 140)}`);
  }
}

console.log(
  `\nZnaleziono ${markers.length} wpisanych na sztywno dat/lat w ${markersByFile.size} plikach. ` +
    'Checklista: docs/edition-rollover.md'
);
