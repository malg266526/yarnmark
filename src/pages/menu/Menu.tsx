import { usePhone } from '../../hooks/usePhone';
import React from 'react';
import { MobileMenu } from './MobileMenu';
import { UpgradedMenu } from './UpgradedMenu';

export const Menu = () => {
  const isPhone = usePhone();

  if (isPhone) {
    return <MobileMenu />;
  }

  return <UpgradedMenu isVisible={true} />;
};
