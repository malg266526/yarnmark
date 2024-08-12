import { usePhone } from '../../hooks/usePhone';
import React from 'react';
import { MobileMenu } from './MobileMenu';
import { DesktopMenu } from './DesktopMenu';

export const Menu = () => {
  const isPhone = usePhone();

  if (isPhone) {
    return <MobileMenu />;
  }

  return <DesktopMenu />;
};
