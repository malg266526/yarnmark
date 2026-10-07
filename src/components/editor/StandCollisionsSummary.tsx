import React from 'react';
import styled from 'styled-components';
import type { StandProps } from './StandProps';
import type { StandCollision } from './utils/standCollisionUtils';
import { RedesignSpacings } from '../../styles/spacings';
import { useTypedTranslation } from '../../translations/useTypedTranslation';

const COLLISION_PILL_HEIGHT_PX = 28;

const SummaryContainer = styled.div<{ hasCollisions: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${RedesignSpacings.xs};
  max-width: 100%;
  box-sizing: border-box;
  min-height: calc(${COLLISION_PILL_HEIGHT_PX}px + 2 * ${RedesignSpacings.xs} + 2px);
  padding: ${RedesignSpacings.xs} ${RedesignSpacings.sm};
  border-radius: 8px;
  border: 1px solid ${({ hasCollisions }) => (hasCollisions ? '#dc2626' : '#16a34a')};
  background-color: ${({ hasCollisions }) => (hasCollisions ? '#fef2f2' : '#f0fdf4')};
  color: ${({ hasCollisions }) => (hasCollisions ? '#991b1b' : '#166534')};
  font-weight: 700;
`;

const CollisionPill = styled.button`
  display: inline-flex;
  align-items: center;
  height: ${COLLISION_PILL_HEIGHT_PX}px;
  box-sizing: border-box;
  padding: 0 ${RedesignSpacings.sm};
  border: 1px solid #dc2626;
  border-radius: 999px;
  background-color: #fff;
  color: #991b1b;
  font: inherit;
  font-size: 0.875rem;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  cursor: pointer;

  &:hover {
    background-color: #fee2e2;
  }

  &:focus-visible {
    outline: 2px solid #b91c1c;
    outline-offset: 2px;
  }
`;

interface StandCollisionsSummaryProps {
  collisions: StandCollision[];
  onSelectStand: (stand: StandProps) => void;
}

export const StandCollisionsSummary = ({ collisions, onSelectStand }: StandCollisionsSummaryProps) => {
  const t = useTypedTranslation();

  if (collisions.length === 0) {
    return (
      <SummaryContainer hasCollisions={false} role="status">
        {t('editorPage.collisions.none')}
      </SummaryContainer>
    );
  }

  return (
    <SummaryContainer hasCollisions role="status">
      {t('editorPage.collisions.count', { count: collisions.length })}
      {collisions.map(({ first, second }) => (
        <CollisionPill
          key={`${first.id}-${second.id}`}
          type="button"
          aria-label={t('editorPage.collisions.showPair', { first: first.index, second: second.index })}
          onClick={() => onSelectStand(first)}
        >
          {t('editorPage.collisions.pair', { first: first.index, second: second.index })}
        </CollisionPill>
      ))}
    </SummaryContainer>
  );
};
