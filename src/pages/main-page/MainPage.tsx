import React, { useCallback, useRef } from 'react';
import { InvitationCardWrapper, StyledPageContent } from './MainPage.styled';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { NavigationBand } from './NavigationBand';
import { Header } from '../menu/Header';
import { LastEditionBand } from './LastEditionBand';
import { InvitationCard } from './InvitationCard';
import { LocationBand } from './LocationBand';
import { usePhone } from '../../hooks/usePhone';
import { CoreInfoBand } from './mobile/CoreInfoBand';
import { Band } from '../../components/bands/Band';
import { WoolPicture } from '../../components/WoolPicture';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { BackgroundColors } from '../../styles/theme';
import { TicketCardBand } from './TicketCardBand';
import { WorkshopsDesktopBand } from './workshops/WorkshopsDesktopBand';
import { WorkshopsMobileSchedule } from './workshops/WorkshopsMobileSchedule';
import { FoodBand } from './FoodBand';
import { BandsToggles } from '../../toggles';
import { VendorsList2025 } from './VendorsList2025';

export const MainPage = () => {
  const isPhone = usePhone();
  const t = useTypedTranslation();

  const pageContentRef = useRef<HTMLDivElement | null>(null);

  const ticketsFunnyButtonRef = useRef<HTMLDivElement | null>(null);

  const observerCallback = useCallback(() => {}, []);

  useIntersectionObserver({
    containerRef: pageContentRef,
    elementToObserveRef: ticketsFunnyButtonRef,
    callback: observerCallback,
  });

  return (
    <StyledPageContent ref={pageContentRef} variant="wide" padding="none">
      <Header />

      {isPhone ? (
        <>
          <InvitationCard />
          <CoreInfoBand id="coreInfo" />
          {/*<Band.CenteredColumn color={BackgroundColors.ticketBand} id="TicketBand" size="lg" padding="lg">*/}
          {/*  <TicketCard />*/}
          {/*</Band.CenteredColumn>*/}

          <Band.Empty id="lastEdition" color={BackgroundColors.ticketBand} padding="sm">
            <LastEditionBand />
          </Band.Empty>

          {/*<CruiseBand id="cruise" />*/}

          {/*<WorkshopsScheduleMobileBand id="schedule" />*/}

          <Band.SecondaryTitle>{t('tickets.workshopsTickets')}</Band.SecondaryTitle>
          <Band.Empty id="workshops" padding="xs">
            <WorkshopsMobileSchedule />
          </Band.Empty>

          <Band.SecondaryTitle>{t('vendors')} 2025</Band.SecondaryTitle>

          <Band.CenteredColumn id="vendors" size="lg" padding="none" color={BackgroundColors.vendors}>
            <VendorsList2025 />
          </Band.CenteredColumn>

          {BandsToggles.foodEnabled && <FoodBand id="food" />}
        </>
      ) : (
        <>
          <Band.Wallpaper id="invitation" picture={<WoolPicture />} size="xl" justify="flex-start">
            <InvitationCardWrapper>
              <InvitationCard />
            </InvitationCardWrapper>
          </Band.Wallpaper>

          <Band.CenteredColumn id="lastEdition" color={BackgroundColors.lastEditionBand} padding="sm" gap="lg">
            <LastEditionBand />
          </Band.CenteredColumn>

          <NavigationBand />

          <TicketCardBand />

          <LocationBand id="location" />

          {/*<CruiseBand id="cruise" />*/}

          <Band.CenteredColumn
            id="vendors"
            size="md"
            gap="lg"
            padding="xxxl"
            color={BackgroundColors.vendors}
            justify="center"
          >
            {/*<Band.Title>{t('vendors')}</Band.Title>*/}
            {/*<VendorsList />*/}
            <Band.Title>{t('vendors')} 2025</Band.Title>
            <VendorsList2025 />
          </Band.CenteredColumn>

          <WorkshopsDesktopBand id="workshops" />

          {BandsToggles.foodEnabled && <FoodBand id="food" />}
        </>
      )}
    </StyledPageContent>
  );
};
