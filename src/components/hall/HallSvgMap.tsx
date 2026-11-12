import React from 'react';
import styled, { css } from 'styled-components';
import { HALL_SVG_MAP_DESIGN } from './hallSvgMapDesign';
import type { HallSvgMapLayout } from './hallSvgMapUtils';

const fluidSizeStyles = css`
  width: 100%;
  height: auto;
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
  const design = HALL_SVG_MAP_DESIGN;

  return (
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
        <g key={stand.id}>
          <rect
            x={stand.x}
            y={stand.y}
            width={stand.width}
            height={stand.height}
            rx={design.standRadius}
            ry={design.standRadius}
            fill={stand.fill}
            stroke={design.strokeColor}
            strokeWidth={design.strokeWidth}
          />
          {stand.index && (
            <text
              x={stand.centerX}
              y={stand.index.y}
              textAnchor="middle"
              fontSize={stand.fontSize}
              fontWeight="bold"
              fill={design.indexColor}
              fontFamily={design.fontFamily}
            >
              {stand.index.text}
            </text>
          )}
          {stand.label && (
            <text
              x={stand.centerX}
              y={stand.label.y}
              textAnchor="middle"
              fontSize={stand.fontSize}
              fill={design.labelColor}
              fontFamily={design.fontFamily}
            >
              {stand.label.lines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={stand.centerX} dy={lineIndex === 0 ? 0 : `${design.lineHeightEm}em`}>
                  {line}
                </tspan>
              ))}
            </text>
          )}
        </g>
      ))}
    </MapSvg>
  );
};
