import React from 'react';
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
import { WorkshopsConfig } from './workshopsConfig';
import { RibbonCard } from './cards/RibbonCard';
import { WorkshopModal } from './WorkshopModal';
import { useWorkshopModalToggle } from './useWorkshopModalToggle';

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

  const { isModalOpen, currentWorkshop, toggleModal, close } = useWorkshopModalToggle();

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

      <WorkshopModal isOpen={isModalOpen} close={close} workshop={currentWorkshop} />
    </Band.CenteredColumn>
  );
};
