import React from 'react';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors } from '../../../styles/theme';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { MultiCarousel } from '../../../components/carousels/MultiCarousel';
import { WorkshopsConfig } from './workshopsConfig';
import { RibbonCard } from './cards/RibbonCard';
import { WorkshopModal } from './WorkshopModal';
import { useWorkshopModalToggle } from './useWorkshopModalToggle';
import { Schedule } from './Schedule';

type WorkshopsBandType = {
  id: string;
};

/*const ImageSection = styled.div`
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
`;*/

export const WorkshopsDesktopBand = ({ id }: WorkshopsBandType) => {
  const t = useTypedTranslation();

  const { isModalOpen, currentWorkshop, toggleModal, close } = useWorkshopModalToggle();

  return (
    <Band.CenteredColumn id={id} size="lg" gap="xl" padding="xl" color={BackgroundColors.workshopsBand}>
      <Band.Title>{t('workshops.title')}</Band.Title>

      {/*      <ImageSection>
        <StrongCtaButton>{t('tickets.buyTicket')}</StrongCtaButton>
        <WoolBackgroundSection />
      </ImageSection>*/}

      <Schedule />

      <MultiCarousel
        items={WorkshopsConfig.map((workshop, index) => (
          <RibbonCard key={`mirrorsRoom_${index}`} workshop={workshop} onClick={toggleModal} />
        ))}
      />

      <WorkshopModal isOpen={isModalOpen} close={close} workshop={currentWorkshop} />
    </Band.CenteredColumn>
  );
};
