import React, { useCallback, useRef } from 'react';

import { StyledPageContent } from './MainPage.styled';
import { useRootIntersectionObserver } from '../useRootIntersectionObserver';

import { FunnyButtonsSection } from './FunnyButtonsSection';
import { InvitationBand } from './InvitationBand';
import { VendorsSection } from './VendorsSection';
import { LocationSection } from './LocationSection';
import { WorkshopsBand } from './workshops/WorkshopsBand';
import { WorkshopsScheduleBand } from './workshops/WorkshopsScheduleBand';
import { FoodBand } from './FoodBand';
import { FirstAidBand } from './workshops/FirstAidBand';
import { CruiseBand } from './CruiseBand';
import { MainPageMenu } from './MainPageMenu';

export const MainPage = () => {
  const pageContentRef = useRef<HTMLDivElement | null>(null);

  const ticketsFunnyButtonRef = useRef<HTMLDivElement | null>(null);

  const observerCallback = useCallback(() => {}, []);

  useRootIntersectionObserver({
    rootRef: pageContentRef,
    elementToObserveRef: ticketsFunnyButtonRef,
    callback: observerCallback
  });

  return (
    <StyledPageContent ref={pageContentRef} variant="wide" padding="none">
      <MainPageMenu />

      <InvitationBand />

      <FunnyButtonsSection />

      <LocationSection id="location" />

      <VendorsSection id="vendors" />

      <WorkshopsBand id="workshops" />

      <FirstAidBand id="firstaid" />

      <WorkshopsScheduleBand id="schedule" />

      <CruiseBand id="cruise" />

      <FoodBand id="food" />
    </StyledPageContent>
  );
};
