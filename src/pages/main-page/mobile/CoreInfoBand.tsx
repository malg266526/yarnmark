import React from 'react';
import { Typography } from '../../../components/Typography';
import { FlexColumnLayout } from '../../../components/FlexColumnLayout';
import { Trans } from 'react-i18next';
import shipIconUrl from '../../../assets/figmaIcons/ship_icon.svg';
import { Icon } from '../../../components/Icon';
import redMapMarkerIconUrl from '../../../assets/figmaIcons/red_map_marker_icon.svg';
import blueTicketsIconUrl from '../../../assets/figmaIcons/blue_tickets_icon.svg';
import calendarIconUrl from '../../../assets/figmaIcons/calendar_icon.svg';
import styled from 'styled-components';
import { GrayScale, TextColors } from '../../../styles/theme';
import { Band } from '../../../components/bands/Band';
/*
import mapIcon from '../../../assets/figmaIcons/map_icon.svg';
*/
import { useTypedTranslation } from '../../../translations/useTypedTranslation';

const InfoColumn = styled(FlexColumnLayout)`
  text-align: center;
`;

const Link = styled.a`
  color: ${TextColors.accent};
  text-decoration: none;
`;

interface CoreInfoBandProps {
  id: string;
}

export const CoreInfoBand = ({ id }: CoreInfoBandProps) => {
  const t = useTypedTranslation();

  return (
    <Band.NarrowColumn id={id} color={GrayScale[50]} size="lg">
      <InfoColumn align="center" padding="none" gap="lg">
        <FlexColumnLayout gap="xs" padding="none">
          <Icon size="lg" zIndex={0} src={calendarIconUrl} />
          <Typography size="sm">{t('navigationBand.when')}</Typography>
        </FlexColumnLayout>

        <FlexColumnLayout gap="xs" padding="none">
          <Icon size="lg" zIndex={0} src={redMapMarkerIconUrl} />
          <Typography size="sm">Hala 100-lecia KS Cracovia</Typography>
          <Typography size="sm">
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
          <Typography size="sm">
            <Trans
              i18nKey="tickets.buyTicketsAndWorkshops"
              components={[
                <Link
                  key="tickets_url"
                  target="_blank"
                  href="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355"
                  aria-label="tickets"
                />
              ]}
            />
          </Typography>
        </FlexColumnLayout>

        {/*        <FlexColumnLayout gap="xs" padding="none">
          <Icon size="lg" zIndex={0} src={mapIcon} />
          <Link href="/hall">
            <Typography size="sm">{t('hallMap.title')}</Typography>
          </Link>
        </FlexColumnLayout>*/}

        <FlexColumnLayout gap="xs" padding="none">
          <Icon size="lg" zIndex={0} src={shipIconUrl} />
          <Typography size="sm">
            <Trans
              i18nKey="tickets.cruiseTicketHere"
              components={[<Link key="cruise_tickets_here" href="/home#cruise" />]}
            />
          </Typography>
        </FlexColumnLayout>
      </InfoColumn>
    </Band.NarrowColumn>
  );
};
