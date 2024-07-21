import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { usePhone } from '../../hooks/usePhone';
import React from 'react';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { RibbonMenu } from './RibbonMenu';
import { SideBarMenu } from "./SideBarMenu";

export const Menu = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();

  if (isPhone) {
      return (
          <SideBarMenu />
      )
  }

  return (
    <RibbonMenu>
      <RibbonMenu.DropdownItem
        subLinks={[
          {
            to: '/home#vendors',
            name: t('menu.vendors')
          },
          {
            to: '/home#workshops',
            name: t('menu.workshops')
          },
          {
            to: '/home#cruise',
            name: t('menu.cruise')
          },
          {
            to: '/home#food',
            name: t('buttonsBand.foodButton')
          },
          {
            to: '/home#lastEdition',
            name: 'Yarnmark 2024'
          },
          {
            to: '#footer',
            name: t('menu.contact')
          }
        ]}>
        Home
      </RibbonMenu.DropdownItem>

      <RibbonMenu.DropdownItem
        subLinks={[
          {
            to: 'https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832',
            name: t('menu.entranceTicket'),
            target: '_blank'
          },
          {
            to: 'https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny-warsztaty/358',
            name: t('menu.workshopTickets'),
            target: '_blank'
          },
          {
            to: 'https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-rejs/2833',
            name: t('menu.cruiseTickets'),
            target: '_blank'
          }
        ]}>
        {t('menu.tickets')}
      </RibbonMenu.DropdownItem>

      <RibbonMenu.LinkItem to="/hall" target="_blank">
        {t('buttonsBand.hallMap')}
      </RibbonMenu.LinkItem>

      <RibbonMenu.DropdownItem subLinks={[
          {
              to: '/info-for-vendors#stands',
              name: t('menu.stands')
          },

          {
              to: '/info-for-vendors#footer',
              name: t('menu.contact')
          }
      ]}>{t('menu.infoForVendors')}</RibbonMenu.DropdownItem>

      <RibbonMenu.LinkItem to="/statutes">{t('menu.statutes')}</RibbonMenu.LinkItem>

      <LanguageSwitcher />
    </RibbonMenu>
  );
};
