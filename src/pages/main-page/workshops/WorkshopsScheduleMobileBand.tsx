import React from 'react';
import styled from 'styled-components';
import { Band } from '../../../components/bands/Band';
import { Schedule } from './Schedule';
import { Picture } from '../../../components/Picture';
import workshopsMapUrl from '../../../assets/images/workshops/mapka_warsztaty.jfif';
import workshopsMapUrlWepb from '../../../assets/images/workshops/mapka_warsztaty.webp';
import workshopsMapUrlAvif from '../../../assets/images/workshops/mapka_warsztaty.avif';
import { Accordion } from '../../../components/accordion/Accordion';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { RedesignSpacings } from '../../../styles/spacings';
import { BackgroundColors } from '../../../styles/theme';

type WorkshopsBandType = {
  id: string;
};

const AccordionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.md};
  width: 100%;
`;

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const WorkshopsScheduleMobileBand = ({ id }: WorkshopsBandType) => {
  const t = useTypedTranslation();

  return (
    <Band.Empty id={id} padding="xs" overflow="scroll" color={BackgroundColors.ticketBand}>
      <AccordionsWrapper>
        <Accordion title={t('workshops.scheduleTitle')}>
          <Schedule />
        </Accordion>

        <Accordion title={t('workshops.mapTitle')}>
          <CenteredWrapper>
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
              width={400}
            />
          </CenteredWrapper>
        </Accordion>
      </AccordionsWrapper>
    </Band.Empty>
  );
};
