import React from 'react';
import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { useLayoutSummary } from './useLayoutSummary';
import {
  SELLABLE_STAND_TYPES,
  formatDecimal,
  formatSignedDifference,
  type StandTypeTotals
} from './utils/layoutSummaryUtils';

const Panel = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xs};
  width: 100%;
  box-sizing: border-box;
  padding: ${RedesignSpacings.sm};
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
`;

const SUMMARY_LINE_HEIGHT_PX = 20;

const SummaryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  line-height: ${SUMMARY_LINE_HEIGHT_PX}px;
  font-variant-numeric: tabular-nums;
`;

const HeaderCell = styled.th<{ numeric?: boolean }>`
  padding: 4px 8px;
  border-bottom: 1px solid #d1d5db;
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 700;
  text-align: ${({ numeric }) => (numeric ? 'right' : 'left')};
  white-space: nowrap;
`;

const BodyCell = styled.td<{ numeric?: boolean; muted?: boolean }>`
  padding: 4px 8px;
  text-align: ${({ numeric }) => (numeric ? 'right' : 'left')};
  color: ${({ muted }) => (muted ? '#6b7280' : '#111827')};
  white-space: nowrap;
`;

const TotalRow = styled.tr`
  font-weight: 700;

  & > td {
    border-top: 1px solid #d1d5db;
  }
`;

const HallUsage = styled.p`
  margin: 0;
  font-size: 0.875rem;
`;

interface LayoutSummaryCellsProps {
  label: string;
  current: StandTypeTotals;
  baseline: StandTypeTotals;
  locale: string;
}

const LayoutSummaryCells = ({ label, current, baseline, locale }: LayoutSummaryCellsProps) => (
  <>
    <BodyCell>{label}</BodyCell>
    <BodyCell numeric>{current.count}</BodyCell>
    <BodyCell numeric muted>
      {formatSignedDifference(current.count - baseline.count, locale)}
    </BodyCell>
    <BodyCell numeric>{formatDecimal(current.areaM2, locale)}</BodyCell>
    <BodyCell numeric muted>
      {formatSignedDifference(current.areaM2 - baseline.areaM2, locale)}
    </BodyCell>
  </>
);

export const LayoutSummaryPanel = () => {
  const t = useTypedTranslation();
  const locale = t.i18n.language;
  const { current, baseline } = useLayoutSummary();

  return (
    <Panel aria-labelledby="layout-summary-title" data-layout-summary>
      <Title id="layout-summary-title">{t('editorPage.layoutSummary.title')}</Title>
      <SummaryTable>
        <thead>
          <tr>
            <HeaderCell>{t('editorPage.layoutSummary.columns.type')}</HeaderCell>
            <HeaderCell numeric>{t('editorPage.layoutSummary.columns.count')}</HeaderCell>
            <HeaderCell numeric>{t('editorPage.layoutSummary.columns.countDifference')}</HeaderCell>
            <HeaderCell numeric>{t('editorPage.layoutSummary.columns.area')}</HeaderCell>
            <HeaderCell numeric>{t('editorPage.layoutSummary.columns.areaDifference')}</HeaderCell>
          </tr>
        </thead>
        <tbody>
          {SELLABLE_STAND_TYPES.map((type) => (
            <tr key={type}>
              <LayoutSummaryCells
                label={t(`editorPage.standForm.types.${type}` as const)}
                current={current.byType[type]}
                baseline={baseline.byType[type]}
                locale={locale}
              />
            </tr>
          ))}
          <TotalRow>
            <LayoutSummaryCells
              label={t('editorPage.layoutSummary.total')}
              current={current.sellable}
              baseline={baseline.sellable}
              locale={locale}
            />
          </TotalRow>
        </tbody>
      </SummaryTable>
      <HallUsage>
        {t('editorPage.layoutSummary.hallUsage', {
          percent: formatDecimal(current.hallUsagePercent, locale),
          hallArea: formatDecimal(current.hallAreaM2, locale),
          baselinePercent: formatDecimal(baseline.hallUsagePercent, locale),
          baselineHallArea: formatDecimal(baseline.hallAreaM2, locale)
        })}
      </HallUsage>
    </Panel>
  );
};
