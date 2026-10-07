import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { useLayoutFinance } from './useLayoutFinance';
import {
  BodyCell,
  HeaderCell,
  Panel,
  PanelNote,
  PriceInput,
  SummaryTable,
  Title,
  TotalRow
} from './LayoutPanels.styled';
import { STAND_PRICES_2026, formatCurrency, formatSignedCurrency } from './utils/layoutFinanceUtils';

const MISSING_VALUE = '—';

export const LayoutFinancePanel = () => {
  const t = useTypedTranslation();
  const locale = t.i18n.language;
  const { finances, prices, setPrice } = useLayoutFinance();
  const formatOptionalCurrency = (value: number | null) =>
    value === null ? MISSING_VALUE : formatCurrency(value, locale);
  const typeLabel = (type: (typeof finances.rows)[number]['type']) => t(`editorPage.standForm.types.${type}` as const);
  const totalCount = finances.rows.reduce((total, { count }) => total + count, 0);

  return (
    <Panel aria-labelledby="layout-finance-title" data-layout-finance>
      <Title id="layout-finance-title">{t('editorPage.finance.title')}</Title>
      <SummaryTable>
        <thead>
          <tr>
            <HeaderCell>{t('editorPage.finance.columns.type')}</HeaderCell>
            <HeaderCell numeric>{t('editorPage.finance.columns.price')}</HeaderCell>
            <HeaderCell numeric>{t('editorPage.finance.columns.count')}</HeaderCell>
            <HeaderCell numeric>{t('editorPage.finance.columns.revenue')}</HeaderCell>
            <HeaderCell numeric>{t('editorPage.finance.columns.revenueDifference')}</HeaderCell>
          </tr>
        </thead>
        <tbody>
          {finances.rows.map(({ type, count, revenue, baselineRevenue }) => (
            <tr key={type}>
              <BodyCell>{typeLabel(type)}</BodyCell>
              <BodyCell numeric>
                <PriceInput
                  type="text"
                  inputMode="numeric"
                  value={prices[type] ?? ''}
                  aria-label={t('editorPage.finance.priceLabel', { type: typeLabel(type) })}
                  onChange={(event) => setPrice(type, event.target.value)}
                />
              </BodyCell>
              <BodyCell numeric>{count}</BodyCell>
              <BodyCell numeric>{formatOptionalCurrency(revenue)}</BodyCell>
              <BodyCell numeric muted>
                {revenue === null ? MISSING_VALUE : formatSignedCurrency(revenue - (baselineRevenue ?? 0), locale)}
              </BodyCell>
            </tr>
          ))}
          <TotalRow>
            <BodyCell>{t('editorPage.finance.total')}</BodyCell>
            <BodyCell />
            <BodyCell numeric>{totalCount}</BodyCell>
            <BodyCell numeric>{formatCurrency(finances.revenue, locale)}</BodyCell>
            <BodyCell numeric muted>
              {formatSignedCurrency(finances.revenue - finances.baselineRevenue, locale)}
            </BodyCell>
          </TotalRow>
        </tbody>
      </SummaryTable>
      <PanelNote>
        {t('editorPage.finance.baseline', {
          revenue: formatCurrency(finances.baselineRevenue, locale),
          premium: formatCurrency(STAND_PRICES_2026.premium ?? 0, locale),
          standard: formatCurrency(STAND_PRICES_2026.standard ?? 0, locale),
          mini: formatCurrency(STAND_PRICES_2026.mini ?? 0, locale)
        })}
      </PanelNote>
      {finances.typesWithoutPrice.length > 0 ? (
        <PanelNote role="status">
          {t('editorPage.finance.missingPrice', { types: finances.typesWithoutPrice.map(typeLabel).join(', ') })}
        </PanelNote>
      ) : null}
    </Panel>
  );
};
