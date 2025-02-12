import i18next from 'i18next';
import { pl } from '../../translations/pl';

i18next
  .init({
    interpolation: { escapeValue: false }, // React already does escaping
    lng: 'pl',

    resources: {
      pl
    }
  })
  .then((result) => console.log('test', result));

export default i18next;
