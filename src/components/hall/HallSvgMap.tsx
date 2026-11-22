import React from 'react';
import styled, { css } from 'styled-components';
import { HALL_SVG_MAP_DESIGN } from './hallSvgMapDesign';
import { HallSvgMapStand } from './HallSvgMapStand';
import { HallSvgMapTooltip } from './HallSvgMapTooltip';
import { useHallSvgMapTooltip } from './useHallSvgMapTooltip';
import type { HallSvgMapLayout } from './hallSvgMapUtils';

const fluidSizeStyles = css`
  width: 100%;
  height: auto;
`;

const HallSvgMapFrame = styled.div<{ $isFluid: boolean }>`
  position: relative;
  width: ${({ $isFluid }) => ($isFluid ? '100%' : 'fit-content')};
`;

const MapSvg = styled.svg<{ $isFluid: boolean }>`
  display: block;
  background: ${HALL_SVG_MAP_DESIGN.background};
  border-radius: ${HALL_SVG_MAP_DESIGN.borderRadius}px;
  ${({ $isFluid }) => $isFluid && fluidSizeStyles}
`;

interface HallSvgMapProps {
  isFluid: boolean;
  layout: HallSvgMapLayout;
  title: string;
}

export const HallSvgMap = ({ isFluid, layout, title }: HallSvgMapProps) => {
  const { tooltip, showStandTooltip, hideStandTooltip } = useHallSvgMapTooltip(layout);

  return (
    <HallSvgMapFrame $isFluid={isFluid}>
      <MapSvg
        $isFluid={isFluid}
        role="img"
        aria-label={title}
        width={layout.width}
        height={layout.height}
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {layout.stands.map((stand) => (
          <HallSvgMapStand key={stand.id} stand={stand} onHoverStart={showStandTooltip} onHoverEnd={hideStandTooltip} />
        ))}
      </MapSvg>
      {tooltip && <HallSvgMapTooltip text={tooltip.text} position={tooltip.position} />}
    </HallSvgMapFrame>
  );
};
