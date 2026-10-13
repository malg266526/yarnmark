import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import type zod from 'zod';
import { StandColorsMap } from './editor/StandProps';
import { HallMap } from './hall/HallMap';
import { hallStandsSchema, parseHallStands } from './hall/hallStands';
import { HallStandVendor } from './hall/HallStandVendor';
import { resolveStandColorKey } from './hall/standReservationUtils';
import { Typography } from './Typography';
import { usePhone } from '../hooks/usePhone';

const StandElement = styled.div<{
  left: number;
  top: number;
  color: string;
  width: number;
  height: number;
}>`
  position: absolute;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  background-color: ${({ color }) => color};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type HallType = {
  multiplier: number;
  showFinishedMap?: boolean;
};

type HallConfigurationState =
  | { status: 'pending' }
  | { status: 'error'; error: Error }
  | { status: 'success'; schema: zod.infer<typeof hallStandsSchema> };

export const Hall = ({ multiplier }: HallType) => {
  const [hallConfigurationState, setHallConfigurationState] = useState<HallConfigurationState>({ status: 'pending' });

  const isPhone = usePhone();

  useEffect(() => {
    const validHallConfiguration = parseHallStands();

    if (validHallConfiguration.success) {
      setHallConfigurationState({
        status: 'success',
        schema: validHallConfiguration.data
      });

      return;
    }

    setHallConfigurationState({
      status: 'error',
      error: validHallConfiguration.error
    });
    console.warn('validHallConfiguration', validHallConfiguration.error);
  }, []);

  return (
    <>
      {hallConfigurationState.status === 'error' && <div>Failed to parse data</div>}
      {hallConfigurationState.status === 'pending' && <div>Loading data...</div>}
      {hallConfigurationState.status === 'success' && (
        <HallMap
          id="hall"
          multiplier={multiplier}
          stands={hallConfigurationState.schema}
          renderStand={(standConfiguration, box) => (
            <StandElement
              id={standConfiguration.id}
              key={standConfiguration.id}
              color={StandColorsMap[resolveStandColorKey(standConfiguration)]}
              left={box.left}
              top={box.top}
              height={box.height}
              width={box.width}
            >
              {standConfiguration.type !== 'other' && <div>{standConfiguration.index}</div>}
              <HallStandVendor vendor={standConfiguration.vendor} vendorLogoUrl={standConfiguration.vendorLogoUrl} />
              {standConfiguration.description && (
                <div>
                  <Typography size={isPhone ? 'xxs' : 'xs'}>{standConfiguration.description}</Typography>
                </div>
              )}
            </StandElement>
          )}
        />
      )}
    </>
  );
};
