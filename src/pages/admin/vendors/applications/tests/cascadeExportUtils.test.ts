import assert from 'node:assert/strict';
import test from 'node:test';
import { buildCascadeProposalCsv, type CascadeExportLabels } from '../utils/cascadeExportUtils.ts';
import { getBaseApplication } from './vendorApplicationFixture.ts';

const labels: CascadeExportLabels = {
  applicationId: 'ID',
  storeName: 'Sklep',
  email: 'E-mail',
  preferredStands: 'Preferencje',
  proposedStand: 'Propozycja',
  result: 'Wynik',
  suggested: 'Niezapisana',
  manualNegotiation: 'Negocjacje'
};

test('proposal CSV includes headers, BOM, escaped values and unallocated applications', () => {
  const csv = buildCascadeProposalCsv(
    [
      {
        application: { ...getBaseApplication(), storeName: 'Wełna; "Łódź"\nSklep', preferredStands: ['S1', 'M2'] },
        reservedStandId: 'M2'
      },
      { application: { ...getBaseApplication(), id: 'blocked', storeName: '=1+1' }, reservedStandId: null }
    ],
    labels
  );

  assert.ok(csv.startsWith('\uFEFF"ID";"Sklep";"E-mail";"Preferencje";"Propozycja";"Wynik"\r\n'));
  assert.ok(csv.includes('"Wełna; ""Łódź""\nSklep"'));
  assert.ok(csv.includes('"S1, M2";"M2";"Niezapisana"'));
  assert.ok(csv.includes('"\'=1+1"'));
  assert.ok(csv.endsWith('"";"Negocjacje"'));
});

test('empty proposal CSV still contains the translated header', () => {
  assert.equal(buildCascadeProposalCsv([], labels), '\uFEFF"ID";"Sklep";"E-mail";"Preferencje";"Propozycja";"Wynik"');
});
