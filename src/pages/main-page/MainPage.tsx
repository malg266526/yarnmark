import React, { useCallback, useRef } from 'react';
import { InvitationCardWrapper, StyledPageContent } from './MainPage.styled';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { NavigationBand } from './NavigationBand';
import { Header } from '../menu/Header';
import { LastEditionBand } from './bands/LastEditionBand';
import { InvitationCard } from './InvitationCard';
import { LocationBand } from './bands/LocationBand';
import { usePhone } from '../../hooks/usePhone';
import { CoreInfoBand } from './mobile/CoreInfoBand';
import { Band } from '../../components/bands/Band';
import { WoolPicture } from '../../components/WoolPicture';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { BackgroundColors } from '../../styles/theme';
import { TicketCardBand } from './bands/ticket/TicketCardBand';
import { WorkshopsDesktopBand } from './workshops/WorkshopsDesktopBand';
import { WorkshopsMobileSchedule } from './workshops/WorkshopsMobileSchedule';
import { FoodBand } from './FoodBand';
import { BandsToggles } from '../../toggles';
import { TicketCard } from './bands/ticket/TicketCard';
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
      <Header />

      {isPhone ? (
        <>
          <InvitationCard />
          <CoreInfoBand id="coreInfo" />
          <Band.CenteredColumn color={BackgroundColors.ticketBand} id="TicketBand" size="lg" padding="lg">
            <TicketCard />
          </Band.CenteredColumn>

          {/*<CruiseBand id="cruise" />*/}

          {/*<WorkshopsScheduleMobileBand id="schedule" />*/}

          {/* <Band.SecondaryTitle>{t('tickets.workshopsTickets')}</Band.SecondaryTitle>
          <Band.Empty id="workshops" padding="xs">
            <WorkshopsMobileSchedule />
          </Band.Empty> */}

          <Band.SecondaryTitle>{t('vendors')} 2025</Band.SecondaryTitle>

          <Band.CenteredColumn id="vendors" size="lg" padding="none" color={BackgroundColors.vendors}>
            <VendorsList />
          </Band.CenteredColumn>

          <Band.Empty id="lastEdition" color={BackgroundColors.ticketBand} padding="sm">
            <LastEditionBand />
          </Band.Empty>

          {BandsToggles.foodEnabled && <FoodBand id="food" />}
        </>
      ) : (
        <>
          <Band.Wallpaper id="invitation" picture={<WoolPicture />} size="xl" justify="flex-start">
            <InvitationCardWrapper>
              <InvitationCard />
            </InvitationCardWrapper>
          </Band.Wallpaper>

          <Band.CenteredColumn
            id="vendors"
            size="md"
            gap="lg"
            padding="xxxl"
            color={BackgroundColors.vendors}
            justify="center"
          >
            <Band.Title>{t('vendors')}</Band.Title>
            <VendorsList />
          </Band.CenteredColumn>

          <NavigationBand />

          <TicketCardBand />

          <LocationBand id="location" />

          {/*<CruiseBand id="cruise" />*/}

          {/* <WorkshopsDesktopBand id="workshops" /> */}

          {BandsToggles.foodEnabled && <FoodBand id="food" />}

          <Band.CenteredColumn id="lastEdition" color={BackgroundColors.lastEditionBand} padding="sm" gap="lg">
            <LastEditionBand />
          </Band.CenteredColumn>
        </>
      )}
    </StyledPageContent>
  );
};
