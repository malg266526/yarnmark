import React, { useCallback, useRef } from 'react';

import { StyledPageContent } from './MainPage.styled';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

import { FunnyButtonsBand } from './FunnyButtonsBand';
import { InvitationBand } from './InvitationBand';
import { VendorsBand } from './VendorsBand';
import { LocationBand } from './LocationBand';
import { WorkshopsBand } from './workshops/WorkshopsBand';
import { WorkshopsScheduleBand } from './workshops/WorkshopsScheduleBand';
import { FoodBand } from './FoodBand';
import { CruiseBand } from './CruiseBand';
import { MainPageMenu } from './MainPageMenu';
import { LastEditionBand } from './LastEditionBand';

export const MainPage = () => {
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
      <MainPageMenu />

      <InvitationBand />

      <FunnyButtonsBand />

      <LocationBand id="location" />

      <VendorsBand id="vendors" />

      <WorkshopsBand id="workshops" />

      <WorkshopsScheduleBand id="schedule" />

      <CruiseBand id="cruise" />

      <FoodBand id="food" />

      <LastEditionBand id="lastEdition" />
    </StyledPageContent>
  );
};
