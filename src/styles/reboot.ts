import { css } from 'styled-components';

export const rebootStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  @media (prefers-reduced-motion: no-preference) {
    :root {
      scroll-behavior: smooth;
    }
  }

  body {
    margin: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    background-color: #fff;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  hr {
    margin: 1rem 0;
    color: inherit;
    border: 0;
    border-top: 1px solid;
    opacity: 0.25;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
  }

  h1 {
    font-size: calc(1.375rem + 1.5vw);
  }

  h2 {
    font-size: calc(1.325rem + 0.9vw);
  }

  h3 {
    font-size: calc(1.3rem + 0.6vw);
  }

  h4 {
    font-size: calc(1.275rem + 0.3vw);
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1rem;
  }

  @media (min-width: 1200px) {
    h1 {
      font-size: 2.5rem;
    }

    h2 {
      font-size: 2rem;
    }

    h3 {
      font-size: 1.75rem;
    }

    h4 {
      font-size: 1.5rem;
    }
  }

  ol,
  ul {
    padding-left: 2rem;
  }

  ol,
  ul,
  dl {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ol ol,
  ul ul,
  ol ul,
  ul ol {
    margin-bottom: 0;
  }

  dt {
    font-weight: 700;
  }

  dd {
    margin-bottom: 0.5rem;
    margin-left: 0;
  }

  b,
  strong {
    font-weight: bolder;
  }

  small {
    font-size: 0.875em;
  }

  a {
    color: #0d6efd;
    text-decoration: underline;
  }

  a:where(:hover) {
    color: #0a58ca;
  }

  a:not([href]):not([class]),
  a:not([href]):not([class]):hover {
    color: inherit;
    text-decoration: none;
  }

  img,
  svg {
    vertical-align: middle;
  }

  table {
    caption-side: bottom;
    border-collapse: collapse;
  }

  th {
    text-align: inherit;
    text-align: -webkit-match-parent;
  }

  thead,
  tbody,
  tfoot,
  tr,
  td,
  th {
    border-color: inherit;
    border-style: solid;
    border-width: 0;
  }

  label {
    display: inline-block;
  }

  button {
    border-radius: 0;
  }

  button:focus:not(:focus-visible) {
    outline: 0;
  }

  input,
  button,
  select,
  optgroup,
  textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button,
  select {
    text-transform: none;
  }

  :where([role='button']) {
    cursor: pointer;
  }

  select {
    word-wrap: normal;
  }

  select:disabled {
    opacity: 1;
  }

  button,
  :where([type='button'], [type='reset'], [type='submit']) {
    -webkit-appearance: button;
  }

  button:not(:disabled),
  [type='button']:not(:disabled),
  [type='reset']:not(:disabled),
  [type='submit']:not(:disabled) {
    cursor: pointer;
  }

  ::-moz-focus-inner {
    padding: 0;
    border-style: none;
  }

  textarea {
    resize: vertical;
  }

  fieldset {
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
  }

  legend {
    float: left;
    width: 100%;
    padding: 0;
    margin-bottom: 0.5rem;
    font-size: calc(1.275rem + 0.3vw);
    line-height: inherit;
  }

  @media (min-width: 1200px) {
    legend {
      font-size: 1.5rem;
    }
  }

  legend + * {
    clear: left;
  }

  ::-webkit-inner-spin-button {
    height: auto;
  }

  :where([type='search']) {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    font: inherit;
    -webkit-appearance: button;
  }

  ::file-selector-button {
    font: inherit;
    -webkit-appearance: button;
  }

  iframe {
    border: 0;
  }

  [hidden] {
    display: none !important;
  }
`;
