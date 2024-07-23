import React from 'react';
import { SolidBackgroundBand } from '../../components/bands/SolidBackgroundBand';
import { Typography } from '../../components/Typography';
import { FlexColumnLayout } from '../../components/FlexColumnLayout';
import { Trans } from 'react-i18next';
import { useTypedTranslation } from '../../translations/useTypedTranslation';

export const LocationAndTicketsBand = () => {
  const t = useTypedTranslation();

  return (
    <SolidBackgroundBand color="white" padding="xl" size="lg">
      <FlexColumnLayout align="center" width="100%" gap="sm">
        <Typography size="md">27/04/2024r 10:00</Typography>
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
        <Typography size="md">{t('tickets.buyTicketsAndWorkshops')}</Typography>
        <Typography size="md">
          <Trans
            i18nKey="tickets.cruiseTicketHere"
            components={[<a key="cruise_tickets_here" href="/home#cruise" />]}
          />
        </Typography>
      </FlexColumnLayout>
    </SolidBackgroundBand>
  );
};
