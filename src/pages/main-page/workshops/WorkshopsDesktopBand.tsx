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
import styled from 'styled-components';
import { RedesignSpacings } from '../../../styles/spacings';
import { Accordion } from '../../../components/accordion/Accordion';

type WorkshopsBandType = {
  id: string;
};

const AccordionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.md};
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const MapWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${RedesignSpacings.md};

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

export const WorkshopsDesktopBand = ({ id }: WorkshopsBandType) => {
  const t = useTypedTranslation();

  const { isModalOpen, currentWorkshop, toggleModal, close } = useWorkshopModalToggle();

  return (
    <Band.CenteredColumn id={id} size="lg" gap="xl" padding="xl" color={BackgroundColors.workshopsBand}>
      <Band.Title>{t('workshops.title')}</Band.Title>

      <AccordionsWrapper>
        <Accordion title={t('workshops.scheduleTitle')}>
          <Schedule />
        </Accordion>

        <Accordion title={t('workshops.mapTitle')}>
          <MapWrapper>
            <Picture
              picture={{
                fallbackUrl: workshopsMapUrl,
                sources: [
                  { type: 'image/webp', url: workshopsMapUrlWepb },
                  { type: 'image/avif', url: workshopsMapUrlAvif }
                ]
              }}
              alt="mapa_warsztaty"
              width={900}
            />
          </MapWrapper>
        </Accordion>
      </AccordionsWrapper>

      <MultiCarousel
        items={WorkshopsConfig.map((workshop, index) => (
          <RibbonCard key={`mirrorsRoom_${index}`} workshop={workshop} onClick={toggleModal} />
        ))}
      />

      <WorkshopModal isOpen={isModalOpen} close={close} workshop={currentWorkshop} />
    </Band.CenteredColumn>
  );
};
