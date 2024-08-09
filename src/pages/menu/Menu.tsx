import { usePhone } from '../../hooks/usePhone';
import React from 'react';
import { SideBarMenu } from './SideBarMenu';
import { SideMenu } from './SideMenu';

export const Menu = () => {
  const isPhone = usePhone();

  if (isPhone) {
    return <SideBarMenu />;
  }

  return <SideMenu />;
};
