import React from 'react';
import styled from 'styled-components';
import { Band } from '../../../components/bands/Band';
import { Schedule } from './Schedule';
import { Picture } from '../../../components/Picture';
import workshopsMapUrl from '../../../assets/images/workshops/mapka_warsztaty.jfif';
import workshopsMapUrlWepb from '../../../assets/images/workshops/mapka_warsztaty.webp';
import workshopsMapUrlAvif from '../../../assets/images/workshops/mapka_warsztaty.avif';

type WorkshopsBandType = {
  id: string;
};

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const WorkshopsScheduleMobileBand = ({ id }: WorkshopsBandType) => {
  return (
    <Band.Empty id={id} padding="xs" overflow="scroll">
      <Schedule />

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
    </Band.Empty>
  );
};
