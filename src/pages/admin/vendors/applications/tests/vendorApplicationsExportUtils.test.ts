import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildVendorApplicationsCsv,
  type VendorApplicationsExportLabels
} from '../utils/vendorApplicationsExportUtils.ts';
import {
  DEFAULT_VENDOR_APPLICATIONS_FILTERS,
  selectVendorApplications
} from '../utils/vendorApplicationsFilterUtils.ts';
import { getBaseApplication } from './vendorApplicationFixture.ts';

const labels: VendorApplicationsExportLabels = {
  applicationId: 'ID',
  submittedAt: 'Zgłoszono',
  storeName: 'Sklep',
  email: 'E-mail',
  phoneNumber: 'Telefon',
  category: 'Kategoria',
  status: 'Status',
  preferredStands: 'Preferencje',
  assignedStands: 'Zapisane przydziały'
};
const categoryLabel = (category: string) => `category:${category}`;
const statusLabel = (status: string) => `status:${status}`;

test('CSV exports only filtered applications in list order with all saved assignments, not proposals', () => {
  const applications = [
    { ...getBaseApplication(), id: 'z', storeName: 'Zebra', status: 'accepted' as const, assignedStands: ['S2', 'M3'] },
    { ...getBaseApplication(), id: 'excluded', status: 'rejected' as const },
    { ...getBaseApplication(), id: 'a', storeName: 'Alpaka', status: 'accepted' as const }
  ];
  const selected = selectVendorApplications(
    applications,
    { ...DEFAULT_VENDOR_APPLICATIONS_FILTERS, status: 'accepted', sortOrder: 'name' },
    'pl'
  );
  const csv = buildVendorApplicationsCsv(selected, labels, categoryLabel, statusLabel);
  assert.ok(!csv.includes('excluded'));
  assert.ok(csv.indexOf('"a"') < csv.indexOf('"z"'));
  assert.ok(csv.includes('"category:yarns";"status:accepted";"A1";"S2, M3"'));
  assert.ok(csv.includes('"category:yarns";"status:accepted";"A1";""'));
  assert.ok(csv.includes(getBaseApplication().submittedAt));
  assert.deepEqual(applications[0].assignedStands, ['S2', 'M3']);
});

test('CSV supports other and missing categories and escapes user content', () => {
  const application = {
    ...getBaseApplication(),
    mainCategory: 'other' as const,
    mainCategoryOther: 'Rękodzieło; "Łódź"',
    storeName: '=1+1'
  };
  const csv = buildVendorApplicationsCsv([application], labels, categoryLabel, statusLabel);
  assert.ok(csv.includes('"Rękodzieło; ""Łódź"""'));
  assert.ok(csv.includes('"\'=1+1"'));
  assert.ok(
    buildVendorApplicationsCsv([{ ...application, mainCategory: null }], labels, categoryLabel, statusLabel).includes(
      ';"";"status:pending";'
    )
  );
});

test('empty CSV contains only translated headers', () => {
  assert.equal(
    buildVendorApplicationsCsv([], labels, categoryLabel, statusLabel),
    '\uFEFF"ID";"Zgłoszono";"Sklep";"E-mail";"Telefon";"Kategoria";"Status";"Preferencje";"Zapisane przydziały"'
  );
});
