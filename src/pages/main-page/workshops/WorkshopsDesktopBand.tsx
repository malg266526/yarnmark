import React, { useCallback, useState } from 'react';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors } from '../../../styles/theme';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import styled from 'styled-components';
import woolImageSrc from '../../../assets/figmaIcons/wool_image.png';
import { CtaButton } from '../../../components/Button';
import { Radius } from '../../../styles/cards';
import { FontSize } from '../../../styles/font-size';
import { RedesignSpacings } from '../../../styles/spacings';
import { MultiCarousel } from '../../../components/carousels/MultiCarousel';
import { WorkshopsConfig, WorkshopsEntry } from './workshopsConfig';
import { RibbonCard } from '../../../components/carousels/RibbonCard';
import { useToggle } from '../../../hooks/useToggle';
import { WorkshopModal } from './WorkshopModal';

type WorkshopsBandType = {
  id: string;
};

const ImageSection = styled.div`
  display: flex;
  align-items: flex-end;
`;

const WoolBackgroundSection = styled.div`
  width: 654px;
  height: 405px;
  flex-shrink: 0;
  background: url(${woolImageSrc});
`;

const StrongCtaButton = styled(CtaButton)`
  border-radius: ${Radius.xl};
  font-size: ${FontSize.xl};
  margin-bottom: ${RedesignSpacings.xxl};
`;

export const WorkshopsDesktopBand = ({ id }: WorkshopsBandType) => {
  const t = useTypedTranslation();

  const [isModalOpen, toggle, close] = useToggle();
  const [currentWorkshop, setCurrentWorkshop] = useState<WorkshopsEntry | undefined>();

  const toggleModal = useCallback(
    (workshop: WorkshopsEntry) => {
      if (isModalOpen) {
        setCurrentWorkshop(undefined);
      } else {
        setCurrentWorkshop(workshop);
      }
      toggle();
    },
    [isModalOpen, toggle]
  );

  return (
    <Band.CenteredColumn id={id} size="lg" gap="md" padding="xl" color={BackgroundColors.workshopsBand}>
      <Band.Title>{t('workshops.title')}</Band.Title>

      <ImageSection>
        <StrongCtaButton>{t('tickets.buyTicket')}</StrongCtaButton>
        <WoolBackgroundSection />
      </ImageSection>

      <MultiCarousel
        items={WorkshopsConfig.map((workshop, index) => (
          <RibbonCard key={`mirrorsRoom_${index}`} workshop={workshop} onClick={toggleModal} />
        ))}
      />

      <WorkshopModal isOpen={isModalOpen} toggle={toggle} close={close} workshop={currentWorkshop} />

      {/*<WorkshopsCarousel />*/}
    </Band.CenteredColumn>
  );
};
