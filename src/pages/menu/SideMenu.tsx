import React from 'react';
import styled from 'styled-components';
import { BackgroundColors } from '../../styles/theme';
import { RedesignSpacings } from '../../styles/spacings';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { Icon } from '../../components/Icon';
import infoIcon from '../../assets/figmaIcons/info_icon.svg';
import ticketIcon from '../../assets/figmaIcons/ticket_icon.svg';

const RootLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  position: fixed;
  z-index: 10;
  left: 0;
  border-radius: 0 12px 12px 0;
  background: ${BackgroundColors.menu};
  gap: 25px;
  padding: ${RedesignSpacings.xs};
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 12px;
  gap: 10px;
`;

export const SideMenu = () => {
  const t = useTypedTranslation();

  return (
    <RootLayout>
      <MenuItem>
        <Icon size="sm" zIndex={0} src={infoIcon} />
        {t('menu.home')}
      </MenuItem>

      <MenuItem>
        <Icon size="sm" zIndex={0} src={infoIcon} />
        {t('menu.whatAndWhere')}
      </MenuItem>

      <MenuItem>
        <Icon size="sm" zIndex={0} src={ticketIcon} />
        {t('menu.entranceTicket')}
      </MenuItem>

      <MenuItem>
        <Icon size="sm" zIndex={0} src={ticketIcon} />
        {t('menu.cruiseTickets')}
      </MenuItem>
    </RootLayout>
  );
};
