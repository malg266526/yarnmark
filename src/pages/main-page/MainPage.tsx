import React, { useCallback, useRef } from 'react';
import { StyledPageContent } from './MainPage.styled';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { FunnyButtonsBand } from './FunnyButtonsBand';
import { VendorsBand } from './VendorsBand';
import { WorkshopsBand } from './workshops/WorkshopsBand';
import { WorkshopsScheduleBand } from './workshops/WorkshopsScheduleBand';
import { FoodBand } from './FoodBand';
import { CruiseBand } from './CruiseBand';
import { Menu } from '../menu/Menu';
import { LastEditionBand } from './LastEditionBand';
import { InvitationBand } from './InvitationBand';
import { LocationBand } from './LocationBand';
import { usePhone } from '../../hooks/usePhone';
import { CoreInfoBand } from './CoreInfoBand';

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

      <InvitationBand id="invitation" />

      {isPhone ? (
        <CoreInfoBand id="coreInfo" />
      ) : (
        <>
          <FunnyButtonsBand />
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
