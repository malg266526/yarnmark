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
import { VendorsList } from './VendorsList';
import { TicketCard } from './TicketCard';
import { TicketCardBand } from './TicketCardBand';
import { WorkshopsDesktopBand } from './workshops/WorkshopsDesktopBand';
import { WorkshopsMobileSchedule } from './workshops/WorkshopsMobileSchedule';
import { CruiseBand } from './CruiseBand';

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

          <Band.SecondaryTitle>{t('tickets.workshopsTickets')}</Band.SecondaryTitle>
          <Band.Empty id="workshopsTickets" padding="xs">
            <WorkshopsMobileSchedule />
          </Band.Empty>

          <Band.SecondaryTitle>{t('vendors')}</Band.SecondaryTitle>

          <Band.CenteredColumn id="vendors" size="lg" padding="none" color={BackgroundColors.vendors}>
            <VendorsList />
          </Band.CenteredColumn>

          <CruiseBand id="cruise" />

          {/* <FoodBand id="food" />*/}

          <Band.Empty id="lastEdition" color={BackgroundColors.lastEditionBand} padding="sm">
            <LastEditionBand />
          </Band.Empty>
        </>
      ) : (
        <>
          <Band.Wallpaper id="invitation" picture={<WoolPicture />} size="xl" justify="flex-start">
            <InvitationCardWrapper>
              <InvitationCard />
            </InvitationCardWrapper>
          </Band.Wallpaper>

          <NavigationBand />

          <TicketCardBand />

          <LocationBand id="location" />

          <Band.CenteredColumn id="vendors" size="md" padding="xxxl" color={BackgroundColors.vendors} justify="center">
            <VendorsList />
          </Band.CenteredColumn>

          <WorkshopsDesktopBand id="workshops" />

          <CruiseBand id="cruise" />

          {/*<FoodBand id="food" />*/}

          <Band.CenteredColumn id="lastEdition" color={BackgroundColors.lastEditionBand} padding="sm" gap="lg">
            <LastEditionBand />
          </Band.CenteredColumn>
        </>
      )}
    </StyledPageContent>
  );
};
