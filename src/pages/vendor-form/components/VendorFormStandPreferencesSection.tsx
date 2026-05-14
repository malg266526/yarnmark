import React from 'react';
import { Trans } from 'react-i18next';
import { Typography } from '../../../components/Typography';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import {
  DisclaimerText,
  ErrorText,
  FieldHint,
  Fieldset,
  FormSection,
  HallLayout,
  HallMapColumn,
  InlineLink,
  LegendBadge,
  LegendCard,
  LegendRow,
  LegendSize,
  LegendText,
  RadioGroup,
  RadioOption,
  StandStatusList,
  StandStatusPill,
  WarningCard
} from '../VendorFormPage.styled';
import { VENDOR_FORM_MAX_PREFERRED_STANDS } from '../vendorFormConstants.ts';
import { SelectableHall } from './SelectableHall';
import type { VendorFormActions, VendorFormBindings, VendorFormDerivedState } from './vendorFormViewContracts';

interface VendorFormStandPreferencesSectionProps {
  derivedState: VendorFormDerivedState;
  formActions: Pick<VendorFormActions, 'setBooleanFieldValue' | 'togglePreferredStand'>;
  formBindings: VendorFormBindings;
}

export const VendorFormStandPreferencesSection = ({
  derivedState,
  formActions,
  formBindings
}: VendorFormStandPreferencesSectionProps) => {
  const t = useTypedTranslation();
  const { formData, resolveFieldErrorMessage } = formBindings;
  const { highInterestSelectedStandIds, highInterestStandIds, standInterestCounts } = derivedState;
  const { setBooleanFieldValue, togglePreferredStand } = formActions;

  return (
    <>
      <FormSection>
        <Fieldset>
          <Typography size="xl">{t('vendorsFormPage.steps.preferredStands.title')}</Typography>
          <FieldHint>
            {t('vendorsFormPage.steps.preferredStands.hint', {
              max: VENDOR_FORM_MAX_PREFERRED_STANDS
            })}
          </FieldHint>
          <FieldHint>{t('vendorsFormPage.steps.preferredStands.orderHint')}</FieldHint>
          <FieldHint>
            {t('vendorsFormPage.steps.preferredStands.counter', {
              current: formData.preferredStands.length,
              max: VENDOR_FORM_MAX_PREFERRED_STANDS
            })}
          </FieldHint>
          <HallLayout>
            <HallMapColumn>
              <SelectableHall
                highInterestStandIds={highInterestStandIds}
                selectedStandIds={formData.preferredStands}
                onToggleStand={togglePreferredStand}
              />
            </HallMapColumn>
            <LegendCard aria-label={t('vendorsFormPage.steps.preferredStands.legendTitle')}>
              <Typography size="sm" weight="bold">
                {t('vendorsFormPage.steps.preferredStands.legendTitle')}
              </Typography>
              <LegendRow>
                <LegendBadge>P</LegendBadge>
                <LegendText>
                  {t('vendorsFormPage.steps.preferredStands.premiumLabel')}
                  <LegendSize>{t('vendorsFormPage.steps.preferredStands.premiumSize')}</LegendSize>
                </LegendText>
              </LegendRow>
              <LegendRow>
                <LegendBadge>S</LegendBadge>
                <LegendText>
                  {t('vendorsFormPage.steps.preferredStands.standardLabel')}
                  <LegendSize>{t('vendorsFormPage.steps.preferredStands.standardSize')}</LegendSize>
                </LegendText>
              </LegendRow>
              <LegendRow>
                <LegendBadge>M</LegendBadge>
                <LegendText>
                  {t('vendorsFormPage.steps.preferredStands.miniLabel')}
                  <LegendSize>{t('vendorsFormPage.steps.preferredStands.miniSize')}</LegendSize>
                </LegendText>
              </LegendRow>
              <LegendRow>
                <LegendBadge>HI</LegendBadge>
                <LegendText>
                  {t('vendorsFormPage.steps.preferredStands.highInterestLabel')}
                  <LegendSize>{t('vendorsFormPage.steps.preferredStands.highInterestHint')}</LegendSize>
                </LegendText>
              </LegendRow>
            </LegendCard>
          </HallLayout>
          {highInterestSelectedStandIds.length > 0 ? (
            <StandStatusList>
              {highInterestSelectedStandIds.map((standId) => (
                <StandStatusPill key={standId}>
                  {standId} · {t('vendorsFormPage.steps.preferredStands.highInterestLabel')}
                </StandStatusPill>
              ))}
            </StandStatusList>
          ) : null}
          {highInterestSelectedStandIds.length > 0 ? (
            <WarningCard>
              {t('vendorsFormPage.steps.preferredStands.highInterestWarning', {
                stands: highInterestSelectedStandIds.join(', ')
              })}
            </WarningCard>
          ) : null}
          <DisclaimerText>
            <Trans
              i18nKey="vendorsFormPage.steps.preferredStands.detailsHint"
              components={[<InlineLink key="vendors_info_link" href="/info-for-vendors" />]}
            />
          </DisclaimerText>
          {formData.preferredStands.length > 0 ? (
            <FieldHint>
              {formData.preferredStands
                .map((standId) =>
                  t('vendorsFormPage.steps.preferredStands.standInterestCount', {
                    count: standInterestCounts.get(standId) ?? 0,
                    standId
                  })
                )
                .join(' • ')}
            </FieldHint>
          ) : null}
          {resolveFieldErrorMessage('preferredStands') ? (
            <ErrorText>{resolveFieldErrorMessage('preferredStands')}</ErrorText>
          ) : null}
        </Fieldset>
      </FormSection>

      <FormSection>
        <Fieldset>
          <Typography size="xl">{t('vendorsFormPage.steps.interestedIfUnavailable.title')}</Typography>
          <RadioGroup>
            <RadioOption>
              <input
                type="radio"
                name="interested_if_unavailable"
                checked={formData.interestedIfUnavailable === true}
                onChange={() => setBooleanFieldValue('interestedIfUnavailable', true)}
              />
              <span>{t('vendorsFormPage.steps.interestedIfUnavailable.yes')}</span>
            </RadioOption>
            <RadioOption>
              <input
                type="radio"
                name="interested_if_unavailable"
                checked={formData.interestedIfUnavailable === false}
                onChange={() => setBooleanFieldValue('interestedIfUnavailable', false)}
              />
              <span>{t('vendorsFormPage.steps.interestedIfUnavailable.no')}</span>
            </RadioOption>
          </RadioGroup>
          {resolveFieldErrorMessage('interestedIfUnavailable') ? (
            <ErrorText>{resolveFieldErrorMessage('interestedIfUnavailable')}</ErrorText>
          ) : null}
        </Fieldset>
      </FormSection>

      <FormSection>
        <Fieldset>
          <Typography size="xl">{t('vendorsFormPage.steps.sponsorshipInterest.title')}</Typography>
          <DisclaimerText>{t('vendorsFormPage.steps.sponsorshipInterest.hint')}</DisclaimerText>
          <RadioGroup>
            <RadioOption>
              <input
                type="radio"
                name="sponsorship_interest"
                checked={formData.sponsorshipInterest === true}
                onChange={() => setBooleanFieldValue('sponsorshipInterest', true)}
              />
              <span>{t('vendorsFormPage.steps.sponsorshipInterest.yes')}</span>
            </RadioOption>
            <RadioOption>
              <input
                type="radio"
                name="sponsorship_interest"
                checked={formData.sponsorshipInterest === false}
                onChange={() => setBooleanFieldValue('sponsorshipInterest', false)}
              />
              <span>{t('vendorsFormPage.steps.sponsorshipInterest.no')}</span>
            </RadioOption>
          </RadioGroup>
        </Fieldset>
      </FormSection>
    </>
  );
};
