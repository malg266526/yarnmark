export interface EditionMarker {
  filePath: string;
  line: number;
  match: string;
  text: string;
}

export interface EditionCheckAllowlistEntry {
  filePath: string;
  contains: string;
  reason: string;
}

const FULL_DATE_PATTERN = /\b\d{1,2}[./]\d{1,2}[./]20\d{2}/g;
const YEAR_PATTERN = /\b20\d{2}\b/g;
const SHORT_DATE_PATTERN = /\b\d{2}\.(0[1-9]|1[0-2])\b(?![.\d%])/g;

const COMMENT_LINE_PREFIXES = ['//', '/*', '*', '{/*'];

const isCommentLine = (line: string) => {
  const trimmedLine = line.trim();

  return COMMENT_LINE_PREFIXES.some((prefix) => trimmedLine.startsWith(prefix));
};

const isAllowlisted = (filePath: string, line: string, allowlist: EditionCheckAllowlistEntry[]) =>
  allowlist.some((entry) => entry.filePath === filePath && line.includes(entry.contains));

const findLineMatches = (line: string): string[] => {
  const fullDates = line.match(FULL_DATE_PATTERN) ?? [];
  const lineWithoutFullDates = fullDates.reduce((current, fullDate) => current.replace(fullDate, ' '), line);
  const years = lineWithoutFullDates.match(YEAR_PATTERN) ?? [];
  const shortDates = lineWithoutFullDates.match(SHORT_DATE_PATTERN) ?? [];

  return [...fullDates, ...years, ...shortDates];
};

export const findEditionMarkers = (
  filePath: string,
  content: string,
  allowlist: EditionCheckAllowlistEntry[]
): EditionMarker[] =>
  content.split('\n').flatMap((line, index) => {
    if (isCommentLine(line) || isAllowlisted(filePath, line, allowlist)) {
      return [];
    }

    return findLineMatches(line).map((match) => ({
      filePath,
      line: index + 1,
      match,
      text: line.trim()
    }));
  });
