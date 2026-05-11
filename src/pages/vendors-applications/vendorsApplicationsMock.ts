import type { VendorApplication } from '../vendors-form/vendorsFormSubmission';

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const MOCK_REFERENCE_TIME = Date.now();
const submittedAtRelativeToNow = (offsetMs: number) => new Date(MOCK_REFERENCE_TIME - offsetMs).toISOString();

export const VENDORS_APPLICATIONS_MOCK: VendorApplication[] = [
  {
    id: 'mock-application-1',
    status: 'new',
    submittedAt: submittedAtRelativeToNow(3 * DAY_MS + 2 * HOUR_MS),
    storeName: 'Włóczki z Krakowa',
    attendedBefore: true,
    mainCategory: 'yarns',
    mainCategoryOther: '',
    preferredStands: ['P2', 'P3', 'S1'],
    interestedIfUnavailable: true,
    phoneNumber: '+48 501 234 567',
    email: 'kontakt@wloczkizkrakowa.pl',
    invoiceDetails: 'Włóczki z Krakowa Sp. z o.o.\nul. Długa 12\n31-146 Kraków\nNIP: 6761234567',
    logoFileName: 'wloczki-z-krakowa-logo.png',
    logoDataUrl: null,
    logoMimeType: null,
    businessDescription:
      'Farbowane ręcznie włóczki i limitowane kolory inspirowane Krakowem, z naciskiem na naturalne składy i spokojną paletę.',
    acceptedStatute: true
  },
  {
    id: 'mock-application-2',
    status: 'considered',
    submittedAt: submittedAtRelativeToNow(2 * DAY_MS + 5 * HOUR_MS),
    storeName: 'Ceramika i Splot',
    attendedBefore: false,
    mainCategory: 'ceramics',
    mainCategoryOther: '',
    preferredStands: ['P2', 'M4', 'S6'],
    interestedIfUnavailable: false,
    phoneNumber: '+48 600 111 222',
    email: 'hello@ceramikaisplot.pl',
    invoiceDetails: 'Ceramika i Splot Joanna Nowak\nul. Zamkowa 8\n30-301 Kraków\nNIP: 6792223344',
    logoFileName: 'ceramika-i-splot.svg',
    logoDataUrl: null,
    logoMimeType: null,
    businessDescription:
      'Tworzymy ceramiczne miski na włóczkę, kubki dla dziewiarek i drobne akcesoria do domowego kącika robótkowego.',
    acceptedStatute: true
  },
  {
    id: 'mock-application-3',
    status: 'accepted',
    submittedAt: submittedAtRelativeToNow(DAY_MS + 9 * HOUR_MS),
    storeName: 'Pętelka Studio',
    attendedBefore: true,
    mainCategory: 'other',
    mainCategoryOther: 'Markery do oczek i akcesoria projektowe',
    preferredStands: ['P3', 'S8', 'M2'],
    interestedIfUnavailable: true,
    phoneNumber: '+48 728 555 444',
    email: 'studio@petelka.pl',
    invoiceDetails: 'Pętelka Studio Marta Zielińska\nul. Mazowiecka 21/4\n30-019 Kraków\nNIP: 6779988776',
    logoFileName: null,
    logoDataUrl: null,
    logoMimeType: null,
    businessDescription:
      'Projektujemy markery, zawieszki do projektów i małe dodatki organizacyjne dla osób robiących na drutach i szydełku.',
    acceptedStatute: true
  },
  {
    id: 'mock-application-4',
    status: 'new',
    submittedAt: submittedAtRelativeToNow(5 * HOUR_MS),
    storeName: 'Candle Loop',
    attendedBefore: false,
    mainCategory: 'candles',
    mainCategoryOther: '',
    preferredStands: ['P2', 'M1', 'M3'],
    interestedIfUnavailable: true,
    phoneNumber: '+48 694 200 300',
    email: 'kontakt@candleloop.pl',
    invoiceDetails: 'Candle Loop Paulina Kurek\nul. Lea 44\n30-052 Kraków\nNIP: 9452231188',
    logoFileName: 'candle-loop-logo.jpg',
    logoDataUrl: null,
    logoMimeType: null,
    businessDescription:
      'Sojowe świece inspirowane włóczkami, naturalnymi barwnikami i spokojnym rytmem domowych robótek.',
    acceptedStatute: true
  },
  {
    id: 'mock-application-5',
    status: 'rejected',
    submittedAt: submittedAtRelativeToNow(3 * HOUR_MS),
    storeName: 'Akcesoria Mgiełka',
    attendedBefore: true,
    mainCategory: 'accessories',
    mainCategoryOther: '',
    preferredStands: ['S3', 'S4', 'P3'],
    interestedIfUnavailable: true,
    phoneNumber: '+48 502 700 111',
    email: 'biuro@mgielka-akcesoria.pl',
    invoiceDetails: 'Mgiełka Akcesoria Sp. z o.o.\nul. Wrocławska 10\n30-006 Kraków\nNIP: 6772445566',
    logoFileName: 'mgielka-akcesoria.pdf',
    logoDataUrl: null,
    logoMimeType: null,
    businessDescription:
      'Szyjemy projektowe woreczki, etui na druty, miarki i dodatki do przechowywania włóczek oraz rozpoczętych prac.',
    acceptedStatute: true
  },
  {
    id: 'mock-application-6',
    status: 'considered',
    submittedAt: submittedAtRelativeToNow(30 * 60 * 1000),
    storeName: 'Len i Konopie',
    attendedBefore: false,
    mainCategory: 'other',
    mainCategoryOther: 'Przędza ręcznie przędziona i włókna do przędzenia',
    preferredStands: ['S6', 'P1', 'P3'],
    interestedIfUnavailable: false,
    phoneNumber: '+48 533 444 999',
    email: 'hello@lenikonopie.pl',
    invoiceDetails: 'Len i Konopie Anna Baran\nul. Karmelicka 28/7\n31-128 Kraków\nNIP: 6762019988',
    logoFileName: null,
    logoDataUrl: null,
    logoMimeType: null,
    businessDescription:
      'Oferujemy włókna roślinne i ręcznie przędzione nitki dla osób, które lubią proces tworzenia od surowca do gotowego motka.',
    acceptedStatute: true
  }
];
