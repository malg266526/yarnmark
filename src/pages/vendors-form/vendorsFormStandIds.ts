const HALL_STAND_INDEX_BY_ID = {
  'mgl5iw69-apfj5ox': 'a1',
  'mgl5l1dd-638vrn7': 'a0',
  'mgl5ldw7-35aihnp': 'S1',
  'mgl5lmv2-rf2z8vs': 'S2',
  'mgl5mosd-zy7ymt5': 'S3',
  'mgl5mz0x-9lgguya': 'S4',
  'mgl5ogvq-pqucf09': 'P1',
  'mgl60s92-lscpjj7': 'P2',
  'mgl613ar-ngm5blq': 'S5',
  'mgl618tt-1yiapaw': 'S6',
  'mgl64q1f-x7w94p5': 'S7',
  'mgl64v4d-yqddbkl': 'S8',
  'mgl6517j-mjhaicf': 'S9',
  'mgl65aou-ptdjo6e': 'S10',
  'mgl65qbi-2kfiih9': 'P3',
  'mgl66pt4-1ygebgf': 'S11',
  'mgl68zf8-rfy5hgh': 'C1',
  'mgl6econ-j4mlyk8': 'S15',
  'mgl6ektc-rbbbi4w': 'S14',
  'mgl6et3j-e9giz38': 'S13',
  'mgl6fi1f-6o60rka': 'A2',
  'mgl6fuog-0pibcjv': 'S12',
  'mgl6kh0d-1jnqs8s': 'P5',
  'mgl6l031-6oufobz': 'S21',
  'mgl6l6xj-wvxnju7': 'S20',
  'mgl6lej8-i38l6td': 'S19',
  'mgl6lzj5-6kpu2mj': 'S18',
  'mgl6mdh4-mwhosiw': 'S17',
  'mgl6mkfw-8hallfi': 'S16',
  'mgl6n8xv-mczs30e': 'A3',
  'mgl6nkta-rs38jfz': 'P4',
  'mgl6ush4-p91myjt': 'M1',
  'mgl6v4gk-ouwx9zh': 'M2',
  'mgl6vc2j-3qc7l5j': 'M3',
  'mgl6wf6b-2ayxfbb': 'S22',
  'mgl6wl89-uat4n17': 'S23',
  'mgl6wrxx-idnr7z0': 'S24',
  'mgl6wwic-tvap3dc': 'S27',
  'mgl6x1b7-40fayv0': 'S25',
  'mgl6x7j0-3q74q4a': 'S26',
  'mgl6yx3j-a6gbbdv': 'S28',
  'mgl6z2cb-1uxwbpm': 'S29',
  'mgl6zbss-39u5b6d': 'S30',
  'mgl6zfsg-fr2jl43': 'S31',
  'mgl6zjh0-jwq4ubf': 'S32',
  'mgl6zxpt-k5hpk88': 'S33',
  'mgl71r2j-qkagdvk': 'S34',
  'mgl71yd5-znghfel': 'S35',
  'mgl72tsa-qs2e7an': 'M7',
  'mgl76hx7-qw6e0d0': 'M6',
  'mgl76tw7-mgn1xq1': 'M5',
  'mgl775wk-c5g9xg2': 'M4'
} as const;

export const normalizeStandId = (standId: string) =>
  HALL_STAND_INDEX_BY_ID[standId as keyof typeof HALL_STAND_INDEX_BY_ID] ?? standId;

export const normalizeStandIds = (standIds: string[]) => {
  const normalizedStandIds: string[] = [];
  const seenStandIds = new Set<string>();

  for (const standId of standIds) {
    const normalizedStandId = normalizeStandId(standId);

    if (seenStandIds.has(normalizedStandId)) {
      continue;
    }

    seenStandIds.add(normalizedStandId);
    normalizedStandIds.push(normalizedStandId);
  }

  return normalizedStandIds;
};
