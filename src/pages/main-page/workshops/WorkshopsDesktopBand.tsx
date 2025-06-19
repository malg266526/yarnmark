import React from 'react';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors } from '../../../styles/theme';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { MultiCarousel } from '../../../components/carousels/MultiCarousel';
import { WorkshopsConfig } from './workshopsConfig';
import { RibbonCard } from './cards/RibbonCard';
import { WorkshopModal } from './WorkshopModal';
import { useWorkshopModalToggle } from './useWorkshopModalToggle';
// import workshopsMapUrlAvif from '../../../assets/images/workshops/mapka_warsztaty.avif';
// import workshopsMapUrl from '../../../assets/images/workshops/mapka_warsztaty.jfif';
// import workshopsMapUrlWepb from '../../../assets/images/workshops/mapka_warsztaty.webp';

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
      <Band.Title>{t('workshops.title')} 2025</Band.Title>

      {/*      <ImageSection>
        <StrongCtaButton>{t('tickets.buyTicket')}</StrongCtaButton>
        <WoolBackgroundSection />
      </ImageSection>*/}

      {/*<Schedule />*/}

      {/*<Picture*/}
      {/*  picture={{*/}
      {/*    fallbackUrl: workshopsMapUrl,*/}
      {/*    sources: [*/}
      {/*      {*/}
      {/*        type: 'image/webp',*/}
      {/*        url: workshopsMapUrlWepb*/}
      {/*      },*/}
      {/*      {*/}
      {/*        type: 'image/avif',*/}
      {/*        url: workshopsMapUrlAvif*/}
      {/*      }*/}
      {/*    ]*/}
      {/*  }}*/}
      {/*  alt="mapa_warsztaty"*/}
      {/*  width={900}*/}
      {/*/>*/}

      <MultiCarousel
        items={WorkshopsConfig.map((workshop, index) => (
          <RibbonCard key={`mirrorsRoom_${index}`} workshop={workshop} onClick={toggleModal} />
        ))}
      />

      <WorkshopModal isOpen={isModalOpen} close={close} workshop={currentWorkshop} />
    </Band.CenteredColumn>
  );
};
