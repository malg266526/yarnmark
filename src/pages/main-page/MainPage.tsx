import React, { useCallback, useRef } from 'react';
import { StyledPageContent } from './MainPage.styled';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { NavigationBand } from './NavigationBand';
import { WorkshopsBand } from './workshops/WorkshopsBand';
import { FoodBand } from './FoodBand';
import { CruiseBand } from './CruiseBand';
import { Menu } from '../menu/Menu';
import { LastEditionBand } from './LastEditionBand';
import { InvitationCard } from './InvitationCard';
import { LocationBand } from './LocationBand';
import { usePhone } from '../../hooks/usePhone';
import { CoreInfoBand } from './mobile/CoreInfoBand';
import { Band } from '../../components/bands/Band';
import { WoolPicture } from '../../components/WoolPicture';
import { TicketBand } from './mobile/TicketBand';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { WorkshopsSchedule } from './workshops/WorkshopsSchedule';
import { BackgroundColors } from '../../styles/theme';
import { VendorsList } from './VendorsList';

export const MainPage = () => {
  const isPhone = usePhone();
  const t = useTypedTranslation();

  const pageContentRef = useRef<HTMLDivElement | null>(null);

  const ticketsFunnyButtonRef = useRef<HTMLDivElement | null>(null);

  const observerCallback = useCallback(() => {}, []);

  useIntersectionObserver({
    containerRef: pageContentRef,
    elementToObserveRef: ticketsFunnyButtonRef,
    callback: observerCallback
  });

  return (
    <StyledPageContent ref={pageContentRef} variant="wide" padding="none">
      <Menu />

      {isPhone ? (
        <>
          <InvitationCard />
          <CoreInfoBand id="coreInfo" />
          <TicketBand />

          <Band.SecondaryTitle>{t('tickets.workshopsTickets')}</Band.SecondaryTitle>
          <Band.Empty id="workshopsTickets" padding="xs">
            <WorkshopsSchedule />
          </Band.Empty>

          <Band.SecondaryTitle>{t('vendorsPage.title')}</Band.SecondaryTitle>

          <Band.CenteredColumn id="vendors" size="lg" padding="none" color={BackgroundColors.gradient}>
            <VendorsList />
          </Band.CenteredColumn>

          <CruiseBand id="cruise" />

          <FoodBand id="food" />

          <Band.Empty id="lastEdition" color={BackgroundColors.primary} padding="sm">
            <LastEditionBand />
          </Band.Empty>
        </>
      ) : (
        <>
          <Band.Wallpaper id="invitation" picture={<WoolPicture />} size="xl" justify="flex-end">
            <InvitationCard />
          </Band.Wallpaper>

          <NavigationBand />

          <LocationBand id="location" />

          <Band.CenteredColumn id="vendors" size="md" padding="xxxl" color={BackgroundColors.gradient} justify="center">
            <VendorsList />
          </Band.CenteredColumn>
          <WorkshopsBand id="workshops" />

          <CruiseBand id="cruise" />

          <FoodBand id="food" />

          <Band.CenteredColumn id="lastEdition" color={BackgroundColors.primary} padding="sm" gap="lg">
            <LastEditionBand />
          </Band.CenteredColumn>
        </>
      )}
    </StyledPageContent>
  );
};
