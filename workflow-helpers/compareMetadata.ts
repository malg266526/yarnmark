import fs from 'fs';
import argv from 'argv';
import parseBytes from 'bytes';
import { Metadata } from './types';

const { baseMetadataFilepath, branchMetadataFilepath, out, ghTableMarkdown } = argv
  .option([
    {
      name: 'baseMetadataFilepath',
      type: 'string'
    },
    {
      name: 'branchMetadataFilepath',
      type: 'string'
    },
    {
      name: 'out',
      type: 'string'
    },
    {
      name: 'ghTableMarkdown',
      type: 'boolean'
    }
  ])
  .run(process.argv).options;

if (!baseMetadataFilepath) {
  throw new Error('No "baseMetadataFilepath" set');
}

if (!branchMetadataFilepath) {
  throw new Error('No "branchMetadataFilepath" set');
}

const GreenCheckMark = ':white_check_mark:';
const RedExclamationMark = ':heavy_exclamation_mark:';
const getPercentageDifference = (baseValue: number, newValue: number) => (newValue / baseValue - 1) * 100;

interface GetComparedMetadataProps {
  baseMetadataFilepath: string;
  branchMetadataFilepath: string;
  headers: [string, string, string, string];
  changeTreshholdPercentage?: number;
}
const getComparedMetadata = ({
  baseMetadataFilepath,
  branchMetadataFilepath,
  headers,
  changeTreshholdPercentage = 0.1
}: GetComparedMetadataProps) => {
  const baseMetadata = JSON.parse(fs.readFileSync(baseMetadataFilepath, { encoding: 'utf-8' })) as Metadata;
  const baseTotalSize = Object.keys(baseMetadata).reduce((acc, key) => acc + baseMetadata[key], 0);

  const branchMetadata = JSON.parse(fs.readFileSync(branchMetadataFilepath, { encoding: 'utf-8' })) as Metadata;
  const branchTotalSize = Object.keys(branchMetadata).reduce((acc, key) => acc + branchMetadata[key], 0);

  const allUniqueNames = new Set([...Object.keys(baseMetadata), ...Object.keys(branchMetadata)]);
  const comparedMetadata = [['', ...headers]] as string[][];

  for (const name of allUniqueNames) {
    comparedMetadata.push([
      name,
      parseBytes(baseMetadata[name], { decimalPlaces: 2 }),
      parseBytes(branchMetadata[name], { decimalPlaces: 2 }),
      parseBytes(branchMetadata[name] - baseMetadata[name], { decimalPlaces: 2 }),
      `${getPercentageDifference(baseMetadata[name], branchMetadata[name]).toFixed(2)}%`
    ]);
  }

  const emote =
    getPercentageDifference(baseTotalSize, branchTotalSize) > changeTreshholdPercentage
      ? RedExclamationMark
      : GreenCheckMark;

  comparedMetadata.push(
    [
      'Total size',
      parseBytes(baseTotalSize, { decimalPlaces: 2 }),
      parseBytes(branchTotalSize, { decimalPlaces: 2 }),
      parseBytes(branchTotalSize - baseTotalSize, { decimalPlaces: 2 }),
      `${emote} ${getPercentageDifference(baseTotalSize, branchTotalSize).toFixed(2)}%`
    ].map((row) => `**${row}**`)
  );

  return comparedMetadata;
};

export const createGitubTable = (data: string[][]) => {
  const table = [] as string[];

  for (const row of data) {
    if (data.indexOf(row) === 1) {
      table.push(...Array(row.length).fill('|-'), '|\n');
    }

    for (const value of row) {
      table.push(`|${value}`);
    }
    table.push('|\n');
  }

  return table.join('');
};

const comparisonMetadata = getComparedMetadata({
  baseMetadataFilepath,
  branchMetadataFilepath,
  headers: ['Master', 'Branch', 'Change', 'Change %']
});
const result = ghTableMarkdown ? createGitubTable(comparisonMetadata) : comparisonMetadata;

if (out) {
  fs.writeFileSync(out, JSON.stringify(result));
}

console.warn(result);
