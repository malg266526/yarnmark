import React, { useId, useState } from 'react';
import { HALL_SVG_MAP_DESIGN } from './hallSvgMapDesign';
import type { HallSvgMapStandLayout } from './hallSvgMapUtils';

interface HallSvgMapStandProps {
  stand: HallSvgMapStandLayout;
  onHoverStart: (standId: string) => void;
  onHoverEnd: (standId: string) => void;
}

export const HallSvgMapStand = ({ stand, onHoverStart, onHoverEnd }: HallSvgMapStandProps) => {
  const design = HALL_SVG_MAP_DESIGN;
  const clipPathId = useId();
  const [hasFailedLogo, setHasFailedLogo] = useState(false);
  const logo = hasFailedLogo ? null : stand.logo;
  const index = logo ? logo.index : stand.index && { ...stand.index, fontSize: stand.fontSize };

  const renderLogo = ({ href, x, y, size }: NonNullable<HallSvgMapStandLayout['logo']>) => {
    const radius = size / 2;
    const imageInset = design.logoPadding + design.logoBorderWidth;

    return (
      <>
        <clipPath id={clipPathId}>
          <circle cx={x + radius} cy={y + radius} r={radius - imageInset} />
        </clipPath>
        <circle
          cx={x + radius}
          cy={y + radius}
          r={radius - design.logoBorderWidth / 2}
          fill={design.logoBackground}
          stroke={design.logoBorderColor}
          strokeWidth={design.logoBorderWidth}
        />
        <image
          href={href}
          x={x + imageInset}
          y={y + imageInset}
          width={size - imageInset * 2}
          height={size - imageInset * 2}
          preserveAspectRatio="xMidYMid meet"
          clipPath={`url(#${clipPathId})`}
          // eslint-disable-next-line react/no-unknown-property -- ReactDOM attaches error listeners to SVG <image> as it does to <img>
          onError={() => setHasFailedLogo(true)}
        />
      </>
    );
  };

  return (
    <g onMouseEnter={() => onHoverStart(stand.id)} onMouseLeave={() => onHoverEnd(stand.id)}>
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
      {index && (
        <text
          x={stand.centerX}
          y={index.y}
          textAnchor="middle"
          fontSize={index.fontSize}
          fontWeight="bold"
          fill={design.indexColor}
          fontFamily={design.fontFamily}
        >
          {index.text}
        </text>
      )}
      {logo && renderLogo(logo)}
      {!logo && stand.label && (
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
  );
};
