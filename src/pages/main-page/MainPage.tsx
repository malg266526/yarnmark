import React, { useCallback, useRef } from 'react';
import { StyledPageContent } from './MainPage.styled';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { NavigationBand } from './NavigationBand';
import { VendorsBand } from './VendorsBand';
import { WorkshopsBand } from './workshops/WorkshopsBand';
import { WorkshopsScheduleBand } from './workshops/WorkshopsScheduleBand';
import { FoodBand } from './FoodBand';
import { CruiseBand } from './CruiseBand';
import { Menu } from '../menu/Menu';
import { LastEditionBand } from './LastEditionBand';
import { InvitationCard } from './InvitationCard';
import { LocationBand } from './LocationBand';
import { usePhone } from '../../hooks/usePhone';
import { CoreInfoBand } from './CoreInfoBand';
import { Band } from '../../components/bands/Band';
import { WoolPicture } from '../../components/WoolPicture';
import { TicketBand } from './TicketBand';

export const MainPage = () => {
  const isPhone = usePhone();

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
        </>
      ) : (
        <>
          <Band.Wallpaper id="invitation" picture={<WoolPicture />} size="xl">
            <InvitationCard />
          </Band.Wallpaper>
          <NavigationBand />
          <LocationBand id="location" />
        </>
      )}

      <VendorsBand id="vendors" />

      <WorkshopsBand id="workshops" />

      <WorkshopsScheduleBand id="schedule" />

      <CruiseBand id="cruise" />

      <FoodBand id="food" />

      <LastEditionBand id="lastEdition" />
    </StyledPageContent>
  );
};
