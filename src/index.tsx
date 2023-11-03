import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { en } from './translations/en';
import { pl } from './translations/pl';
import { BrowserRouter } from 'react-router-dom';

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'pl',
  resources: {
    en,
    pl
  }
});

const root = createRoot(document.querySelector('#app')!);

root.render(
  <I18nextProvider i18n={i18next}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </I18nextProvider>
);
