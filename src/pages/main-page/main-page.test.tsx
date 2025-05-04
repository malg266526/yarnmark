import React from 'react';
import { describe, it } from 'node:test';
import { render } from '@testing-library/react';
import { InvitationCard } from './InvitationCard';
import i18next from './i18nexttests';
import { I18nextProvider } from 'react-i18next';

describe('displays greetings', () => {
  it('shows title', () => {
    const { getByText } = render(<InvitationCard />);

    getByText('Krakoski Yarnmark');
  });

  it('show correct date', () => {
    const { getByText } = render(
      <I18nextProvider i18n={i18next}>
        <InvitationCard />
      </I18nextProvider>,
      {}
    );

    getByText('26/04/2025', { exact: false });
  });
});
