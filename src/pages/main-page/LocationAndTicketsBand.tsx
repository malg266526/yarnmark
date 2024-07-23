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
import { GrayScale } from '../../styles/theme';

const InfoColumn = styled(FlexColumnLayout)`
  text-align: center;
`;

export const LocationAndTicketsBand = () => {
  const t = useTypedTranslation();

  return (
    <SolidBackgroundBand color={GrayScale[50]} size="lg" direction="column" align="center">
      <InfoColumn align="center" padding="md" width="85%" gap="md">
        <FlexColumnLayout gap="xs" padding="none">
          <Icon size="xxl" zIndex={0} src={calendarIconUrl} />
          <Typography size="md">27/04/2024r. o godz. 10:00</Typography>
        </FlexColumnLayout>

        <FlexColumnLayout gap="xs" padding="none">
          <Icon size="xxl" zIndex={0} src={redMapMarkerIconUrl} />
          <Typography size="md">Hala 100-lecia KS Cracovia</Typography>
          <Typography size="md">
            <Trans
              i18nKey="location.findUsOnMaps"
              components={[
                <a
                  key="google_maps"
                  target="_blank"
                  href="https://www.google.pl/maps/@50.0572998,19.9107716,3a,75y,214.48h,88.44t/data=!3m6!1e1!3m4!1sVVYRGhxvt5uE6gsr_G7cwA!2e0!7i16384!8i8192?entry=ttu"
                  rel="noreferrer"
                />
              ]}
            />
          </Typography>
        </FlexColumnLayout>

        <FlexColumnLayout gap="xs" padding="none">
          <Icon size="xxl" zIndex={0} src={blueTicketsIconUrl} />
          <Typography size="md">{t('tickets.buyTicketsAndWorkshops')}</Typography>
          <Icon size="xxl" zIndex={0} src={arrowDownIconUrl} />
        </FlexColumnLayout>

        <FlexColumnLayout gap="xs" padding="none">
          <Icon size="xxl" zIndex={0} src={shipIconUrl} />
          <Typography size="md">
            <Trans
              i18nKey="tickets.cruiseTicketHere"
              components={[<a key="cruise_tickets_here" href="/home#cruise" />]}
            />
          </Typography>
        </FlexColumnLayout>
      </InfoColumn>
    </SolidBackgroundBand>
  );
};
