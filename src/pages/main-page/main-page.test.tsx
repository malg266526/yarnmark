import assert from 'assert';
import React from 'react';
import { describe, it } from 'node:test';
import { render } from '@testing-library/react';
import { InvitationCard } from './InvitationCard';

describe('displays greetings', () => {
  // render1(<InvitationCard />);
  // const card = within(screen.getByTestId('invitationCard'));
  //   card.
  it('test1', () => {
    assert.equal(1, 1);
  });

  it('test2', () => {
    const { getByText } = render(<InvitationCard />);

    getByText('Krakoski2 Yarnmark');
  });
});
