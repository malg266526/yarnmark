import React from 'react';
import styled, { css } from 'styled-components';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { getSectionGapLineRect, type SectionGap } from './utils/sectionGapUtils';
import { formatDecimal } from './utils/layoutSummaryUtils';

const GAP_LINE_THICKNESS_PX = 2;
const GAP_TICK_LENGTH_PX = 10;
const GAP_LABEL_HEIGHT_PX = 20;
const GAP_COLOR = '#1f2937';

const horizontalLineTick = css`
  position: absolute;
  top: 50%;
  width: ${GAP_LINE_THICKNESS_PX}px;
  height: ${GAP_TICK_LENGTH_PX}px;
  background: currentColor;
  transform: translateY(-50%);
  content: '';
`;

const verticalLineTick = css`
  position: absolute;
  left: 50%;
  width: ${GAP_TICK_LENGTH_PX}px;
  height: ${GAP_LINE_THICKNESS_PX}px;
  background: currentColor;
  transform: translateX(-50%);
  content: '';
`;

const tickAtLeft = css`
  left: 0;
`;

const tickAtRight = css`
  right: 0;
`;

const tickAtTop = css`
  top: 0;
`;

const tickAtBottom = css`
  bottom: 0;
`;

interface GapPositionProps {
  $left: number;
  $top: number;
  $length: number;
}

const HorizontalGapLine = styled.div<GapPositionProps>`
  position: absolute;
  left: ${({ $left }) => $left}px;
  top: ${({ $top }) => $top - GAP_LINE_THICKNESS_PX / 2}px;
  width: ${({ $length }) => $length}px;
  height: ${GAP_LINE_THICKNESS_PX}px;
  background: ${GAP_COLOR};
  color: ${GAP_COLOR};
  pointer-events: none;
  z-index: 2;

  &::before {
    ${horizontalLineTick}
    ${tickAtLeft}
  }

  &::after {
    ${horizontalLineTick}
    ${tickAtRight}
  }
`;

const VerticalGapLine = styled.div<GapPositionProps>`
  position: absolute;
  left: ${({ $left }) => $left - GAP_LINE_THICKNESS_PX / 2}px;
  top: ${({ $top }) => $top}px;
  width: ${GAP_LINE_THICKNESS_PX}px;
  height: ${({ $length }) => $length}px;
  background: ${GAP_COLOR};
  color: ${GAP_COLOR};
  pointer-events: none;
  z-index: 2;

  &::before {
    ${verticalLineTick}
    ${tickAtTop}
  }

  &::after {
    ${verticalLineTick}
    ${tickAtBottom}
  }
`;

const GapLabel = styled.div<{ $left: number; $top: number }>`
  position: absolute;
  left: ${({ $left }) => $left}px;
  top: ${({ $top }) => $top}px;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  height: ${GAP_LABEL_HEIGHT_PX}px;
  box-sizing: border-box;
  padding: 0 6px;
  border: 1px solid ${GAP_COLOR};
  border-radius: 999px;
  background: #fff;
  color: ${GAP_COLOR};
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  pointer-events: none;
  z-index: 2;
`;

interface SectionGapsOverlayProps {
  gaps: SectionGap[];
}

export const SectionGapsOverlay = ({ gaps }: SectionGapsOverlayProps) => {
  const t = useTypedTranslation();
  const locale = t.i18n.language;

  return (
    <>
      {gaps.map((gap) => {
        const rect = getSectionGapLineRect(gap);
        const GapLine = gap.axis === 'horizontal' ? HorizontalGapLine : VerticalGapLine;

        return (
          <React.Fragment key={gap.key}>
            <GapLine
              data-section-gap={`${gap.fromIndex}-${gap.toIndex}`}
              $left={rect.left}
              $top={rect.top}
              $length={gap.axis === 'horizontal' ? rect.width : rect.height}
            />
            <GapLabel data-section-gap-label $left={rect.labelLeft} $top={rect.labelTop}>
              {t('editorPage.sectionGaps.distance', { value: formatDecimal(gap.distanceM, locale) })}
            </GapLabel>
          </React.Fragment>
        );
      })}
    </>
  );
};
