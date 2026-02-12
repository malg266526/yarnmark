import React from 'react';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors } from '../../../styles/theme';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { MultiCarousel } from '../../../components/carousels/MultiCarousel';
import { WorkshopsConfig } from './workshopsConfig';
import { RibbonCard } from './cards/RibbonCard';
import { WorkshopModal } from './WorkshopModal';
import { useWorkshopModalToggle } from './useWorkshopModalToggle';
import workshopsMapUrlAvif from '../../../assets/images/workshops/mapka_warsztaty.avif';
import workshopsMapUrl from '../../../assets/images/workshops/mapka_warsztaty.jfif';
import workshopsMapUrlWepb from '../../../assets/images/workshops/mapka_warsztaty.webp';
import { Schedule } from './Schedule';
import { Picture } from '../../../components/Picture';

type WorkshopsBandType = {
  id: string;
};

export const WorkshopsDesktopBand = ({ id }: WorkshopsBandType) => {
  const t = useTypedTranslation();

  const { isModalOpen, currentWorkshop, toggleModal, close } = useWorkshopModalToggle();

  return (
    <Band.CenteredColumn id={id} size="lg" gap="xl" padding="xl" color={BackgroundColors.workshopsBand}>
      <Band.Title>{t('workshops.title')}</Band.Title>

      {/*<ImageSection>*/}
      {/*  <StrongCtaButton>{t('tickets.buyTicket')}</StrongCtaButton>*/}
      {/*  <WoolBackgroundSection />*/}
      {/*</ImageSection>*/}

      <Schedule />

      <Picture
        picture={{
          fallbackUrl: workshopsMapUrl,
          sources: [
            {
              type: 'image/webp',
              url: workshopsMapUrlWepb
            },
            {
              type: 'image/avif',
              url: workshopsMapUrlAvif
            }
          ]
        }}
        alt="mapa_warsztaty"
        width={900}
      />

      <MultiCarousel
        items={WorkshopsConfig.map((workshop, index) => (
          <RibbonCard key={`mirrorsRoom_${index}`} workshop={workshop} onClick={toggleModal} />
        ))}
      />

      <WorkshopModal isOpen={isModalOpen} close={close} workshop={currentWorkshop} />
    </Band.CenteredColumn>
  );
};
