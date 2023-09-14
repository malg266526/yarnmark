import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import common_en from './translations/en/common.json';
import common_pl from './translations/pl/common.json';

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'pl',
  resources: {
    en: {
      common: common_en
    },
    pl: {
      common: common_pl
    }
  }
});

const root = createRoot(document.querySelector('#app')!);

root.render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>
);
