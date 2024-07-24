import React from 'react';
import { SolidBackgroundBand } from '../../components/bands/SolidBackgroundBand';
import { Typography } from '../../components/Typography';
import { FlexColumnLayout } from '../../components/FlexColumnLayout';
import { Trans } from 'react-i18next';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import shipIconUrl from '../../assets/figmaIcons/ship_icon.svg';
import { Icon } from '../../components/Icon';
import redMapMarkerIconUrl from '../../assets/figmaIcons/red_map_marker_icon.svg';
import blueTicketsIconUrl from '../../assets/figmaIcons/blue_tickets_icon.svg';
import arrowDownIconUrl from '../../assets/figmaIcons/arrow_down_icon.svg';
import calendarIconUrl from '../../assets/figmaIcons/calendar_icon.svg';
import styled from 'styled-components';
import { GrayScale, TextColors } from '../../styles/theme';

const InfoColumn = styled(FlexColumnLayout)`
  text-align: center;
`;

const Link = styled.a`
  color: ${TextColors.link};
  text-decoration: none;
`;

interface CoreInfoBandProps {
  id: string;
}

export const CoreInfoBand = ({ id }: CoreInfoBandProps) => {
  const t = useTypedTranslation();

  return (
    <SolidBackgroundBand id={id} color={GrayScale[50]} size="lg" direction="column" align="center">
      <InfoColumn align="center" padding="md" width="85%" gap="md">
        <FlexColumnLayout gap="xs" padding="none">
          <Icon size="lg" zIndex={0} src={calendarIconUrl} />
          <Typography size="md">27/04/2024r. o godz. 10:00</Typography>
        </FlexColumnLayout>

        <FlexColumnLayout gap="xs" padding="none">
          <Icon size="lg" zIndex={0} src={redMapMarkerIconUrl} />
          <Typography size="md">Hala 100-lecia KS Cracovia</Typography>
          <Typography size="md">
            <Trans
              i18nKey="location.findUsOnMaps"
              components={[
                <Link
                  key="google_maps"
                  target="_blank"
                  href="https://www.google.pl/maps/place/Hala+100-lecia+KS+Cracovia+wraz+z+Centrum+Sportu+Niepe%C5%82nosprawnych/@50.0570728,19.9078517,17z/data=!3m1!4b1!4m6!3m5!1s0x47165bdbabf291a1:0x3a0607d5947b7ef2!8m2!3d50.0570694!4d19.9104266!16s%2Fg%2F11f5t43046?entry=ttu"
                  rel="noreferrer"
                />
              ]}
            />
          </Typography>
        </FlexColumnLayout>

        <FlexColumnLayout gap="xs" padding="none">
          <Icon size="lg" zIndex={0} src={blueTicketsIconUrl} />
          <Typography size="md">{t('tickets.buyTicketsAndWorkshops')}</Typography>
          <Icon size="lg" zIndex={0} src={arrowDownIconUrl} />
        </FlexColumnLayout>

        <FlexColumnLayout gap="xs" padding="none">
          <Icon size="lg" zIndex={0} src={shipIconUrl} />
          <Typography size="md">
            <Trans
              i18nKey="tickets.cruiseTicketHere"
              components={[<Link key="cruise_tickets_here" href="/home#cruise" />]}
            />
          </Typography>
        </FlexColumnLayout>
      </InfoColumn>
    </SolidBackgroundBand>
  );
};
