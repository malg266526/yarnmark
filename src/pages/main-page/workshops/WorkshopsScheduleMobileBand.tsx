import React from 'react';
import { Band } from '../../../components/bands/Band';
import { Schedule } from './Schedule';
import { Picture } from '../../../components/Picture';
import workshopsMapUrl from '../../../assets/images/workshops/mapka_warsztaty.jfif';
import workshopsMapUrlWepb from '../../../assets/images/workshops/mapka_warsztaty.webp';
import workshopsMapUrlAvif from '../../../assets/images/workshops/mapka_warsztaty.avif';

type WorkshopsBandType = {
  id: string;
};

export const WorkshopsScheduleMobileBand = ({ id }: WorkshopsBandType) => {
  return (
    <Band.Empty id={id} padding="xs" overflow="scroll">
      <Schedule />

      <Picture
        picture={{
          fallbackUrl: workshopsMapUrl,
          sources: [
            {
              type: 'image/webp',
              url: workshopsMapUrlWepb,
            },
            {
              type: 'image/avif',
              url: workshopsMapUrlAvif,
            },
          ],
        }}
        alt="mapa_warsztaty"
        width={400}
      />
    </Band.Empty>
  );
};
