export type PatternsEditionGroup<TPattern extends { editionYear: number }> = {
  year: number;
  patterns: TPattern[];
};

export const groupPatternsByEdition = <TPattern extends { editionYear: number }>(
  patterns: TPattern[]
): PatternsEditionGroup<TPattern>[] => {
  const groups = new Map<number, TPattern[]>();

  patterns.forEach((pattern) => {
    groups.set(pattern.editionYear, [...(groups.get(pattern.editionYear) ?? []), pattern]);
  });

  return [...groups.entries()].sort(([a], [b]) => a - b).map(([year, grouped]) => ({ year, patterns: grouped }));
};
