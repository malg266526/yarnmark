import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';
import i18next from 'i18next';
import isPropValid from '@emotion/is-prop-valid';
import { en } from './translations/en';
import { pl } from './translations/pl';
import { de } from './translations/de';
import 'bootstrap/dist/css/bootstrap.min.css';

const DEFAULT_PL_BROWSER_SETTINGS = 'pl-PL';
const DEFAULT_DE_BROWSER_SETTINGS = 'de-DE';

const localStorageLanguage = localStorage.getItem('language');
const browserDefaultLanguage = navigator.language;

const browserLanguage =
  browserDefaultLanguage === DEFAULT_PL_BROWSER_SETTINGS
    ? 'pl'
    : browserDefaultLanguage === DEFAULT_DE_BROWSER_SETTINGS
      ? 'de'
      : 'en';

const defaultLanguage = localStorageLanguage ? localStorageLanguage : browserLanguage;

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: defaultLanguage,

  resources: {
    en,
    pl,
    de
  }
});

const root = createRoot(document.querySelector('#app')!);

// This implements the default behavior from styled-components v5
function shouldForwardProp(propName: string, target: unknown) {
  if (typeof target === 'string') {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName);
  }
  // For other elements, forward all props
  return true;
}

root.render(
  <StyleSheetManager shouldForwardProp={shouldForwardProp}>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </StyleSheetManager>
);
