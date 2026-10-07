import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { useLayoutSummary } from './useLayoutSummary';
import { BodyCell, HeaderCell, Panel, PanelNote, SummaryTable, Title, TotalRow } from './LayoutPanels.styled';
import {
  SELLABLE_STAND_TYPES,
  formatDecimal,
  formatSignedDifference,
  type StandTypeTotals
} from './utils/layoutSummaryUtils';

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
      <PanelNote>
        {t('editorPage.layoutSummary.hallUsage', {
          percent: formatDecimal(current.hallUsagePercent, locale),
          hallArea: formatDecimal(current.hallAreaM2, locale),
          baselinePercent: formatDecimal(baseline.hallUsagePercent, locale),
          baselineHallArea: formatDecimal(baseline.hallAreaM2, locale)
        })}
      </PanelNote>
    </Panel>
  );
};
