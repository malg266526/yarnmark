import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import zod from 'zod';
import { usePhone } from '../hooks/usePhone';
import { HallColors } from '../styles/theme';
import hallJson from '../assets/hall.json';
import { StandColorsMap } from './editor/StandProps';

const standTypeSchema = zod.union([
  zod.literal('premium'),
  zod.literal('mini'),
  zod.literal('standard'),
  zod.literal('other')
]);

const standColorSchema = zod.union([
  zod.literal('premium'),
  zod.literal('normal1'),
  zod.literal('normal2'),
  zod.literal('small1'),

  zod.literal('small2'),
  zod.literal('taken'),
  zod.literal('taken2'),
  zod.literal('tech'),
]);

const hallSchema = zod.array(
  zod.object({
    id: zod.string(),
    index: zod.string(),
    vendor: zod.string().optional(),
    description: zod.string().optional(),
    type: standTypeSchema,
    color: standColorSchema,
    width: zod.number(),
    height: zod.number(),
    isHorizontal: zod.boolean(),
    start: zod.object({
      row: zod.number(),
      col: zod.number(),
    }),
    end: zod.object({
      row: zod.number(),
      col: zod.number(),
    })
  })
);

const StandElement = styled.div<{ left: number; top: number; color: string; width: number; height: number; }>`
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

const Container = styled.div<{ width: number; height: number; }>`
  display: flex;
  background-color: ${HallColors.empty};
  position: relative;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

type HallType = {
  multiplier: number;
  showFinishedMap?: boolean;
};

type HallConfigurationState = { status: 'pending' } | { status: 'error'; error: Error} | { status: 'success'; schema: zod.infer<typeof hallSchema> };

export const Hall = ({ showFinishedMap, multiplier }: HallType) => {
  const isPhone = usePhone();
  const renderingMultiplier = 10;
  const [hallConfigurationState, setHallConfigurationState] = useState<HallConfigurationState>({ status: 'pending' });
  const [containerSize, setContainerSize] = useState<{ width: number; height: number; }>({ height: 200, width: 200 });

  useEffect(() => {
      const validHallConfiguration = hallSchema.safeParse(hallJson);

      if (validHallConfiguration.success) {
        setHallConfigurationState({
          status: 'success',
          schema: validHallConfiguration.data
        })
        
        const calculatedContainerDimenions =  validHallConfiguration.data.reduce((size, standConfiguration) => {
          if (size.width < standConfiguration.start.col + standConfiguration.width) {
            size.width = standConfiguration.start.col + standConfiguration.width * 2;
          }
          if (size.height < standConfiguration.start.row + standConfiguration.height) {
            size.height = standConfiguration.start.row + standConfiguration.height * 2;
          }

          return size;
        }, { width: 0, height: 0})
        setContainerSize(calculatedContainerDimenions);

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
      {hallConfigurationState.status === 'error' && (
        <div>Failed to parse data</div>
      )}
      {hallConfigurationState.status === 'pending' && (
        <div>Loading data...</div>
      )}
      {hallConfigurationState.status === 'success' && (
        <Container id="hall" height={containerSize.height * renderingMultiplier} width={containerSize.width * renderingMultiplier} >
          {hallConfigurationState.schema.map((standConfiguration) => {
            return <StandElement
              id={standConfiguration.id}
              key={standConfiguration.id}
              color={StandColorsMap[standConfiguration.color]} 
              left={standConfiguration.start.col * renderingMultiplier} 
              top={standConfiguration.start.row * renderingMultiplier} 
              height={standConfiguration.height * renderingMultiplier * 2}
              width={standConfiguration.width * renderingMultiplier * 2}
            >
                {standConfiguration.type !== 'other' && <div>{standConfiguration.index}</div>}
                <div>{standConfiguration.description}</div>
              </StandElement>
          })}
        </Container>
      )}
    </>
  );
};
