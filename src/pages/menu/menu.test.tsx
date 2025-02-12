import { describe, it } from 'node:test';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { expect } from 'chai';
import { Menu } from './Menu';
import { Header } from './Header';

describe('menu is interactive', () => {
  it('shows menu', () => {
    const { getByTestId } = render(<Header />);

    getByTestId('menu_root');
  });

  it('menu is collapsed by default', () => {
    const { getByTestId } = render(<Menu isVisible={true} />);
    const menuContainer = getByTestId('menu_root');

    screen.debug(menuContainer);

    // expect(menuContainer).to.not.have.property('isOpen');
    expect(menuContainer).to.have.property('aria-expanded', 'false');
  });

  /*  it('menu opens on click', () => {
    const { getAllByRole, getByTestId } = render(<Menu isVisible={true} />);

    const menuContainer = getByTestId('menu_root');
    const toggleButton = getAllByRole('button')[0];

    fireEvent.click(toggleButton);

    screen.debug(menuContainer);
    // expect(menuContainer).to.have.property('isopen');
    expect(menuContainer).to.have.property('aria-expanded', 'true');
  });*/

  /*  it('tickets links should be disabled', () => {
    const { getByDisplayValue, getByTestId, getByText, getByRole } = render(<Menu isVisible={true} />);

    const tickets = getByRole('link');
    //const toggleButton = getAllByRole('button')[0];

    // fireEvent.click(toggleButton);

    screen.debug(tickets);
    // expect(menuContainer).to.have.property('isopen');
    // expect(menuContainer).to.have.property('aria-expanded', 'true');
  });*/
});
