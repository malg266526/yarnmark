import React from 'react';
import { Trans } from 'react-i18next';
import { Typography } from '../../../../components/Typography';
import { FieldHint } from '../../../../components/form/FormField.styled';
import { FormFieldError } from '../../../../components/form/FormFieldError';
import { FormFieldHeading } from '../../../../components/form/FormFieldHeading';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import {
  CheckboxRow,
  DisclaimerText,
  Fieldset,
  FormSection,
  HallLayout,
  HallMapColumn,
  InlineLink,
  LegendBadge,
  LegendCard,
  LegendRow,
  LegendSize,
  LegendSwatch,
  LegendText,
  RadioGroup,
  RadioOption,
  StandStatusList,
  StandStatusPill,
  WarningCard
} from '../VendorFormPage.styled';
import { BackgroundColors } from '../../../../styles/theme';
import {
  VENDOR_FORM_MAX_PREFERRED_STANDS,
  VENDOR_FORM_STANDS_PER_PAIR
} from '../../../../domain/vendorApplications/vendorFormConstants.ts';
import { SelectableHall } from './SelectableHall';
import type { VendorFormActions, VendorFormBindings, VendorFormDerivedState } from './vendorFormViewContracts';

const PREFERRED_STANDS_ERROR_ID = 'vendor-preferred-stands-error';
const INTERESTED_IF_UNAVAILABLE_ERROR_ID = 'vendor-interested-if-unavailable-error';

interface VendorFormStandPreferencesSectionProps {
  derivedState: VendorFormDerivedState;
  formActions: Pick<VendorFormActions, 'setBooleanFieldValue' | 'setWantsTwoStands' | 'togglePreferredStand'>;
  formBindings: VendorFormBindings;
}

export const VendorFormStandPreferencesSection = ({
  derivedState,
  formActions,
  formBindings
}: VendorFormStandPreferencesSectionProps) => {
  const t = useTypedTranslation();
  const { formData, resolveFieldErrorMessage } = formBindings;
  const {
    highInterestSelectedStandIds,
    highInterestStandIds,
    interestKnownStandIds,
    isStandDemandAvailable,
    maxPreferredStands,
    pairAnchorStandId,
    preferredStandGroups
  } = derivedState;
  const { setBooleanFieldValue, setWantsTwoStands, togglePreferredStand } = formActions;
  const preferredStandsError = resolveFieldErrorMessage('preferredStands');
  const interestedIfUnavailableError = resolveFieldErrorMessage('interestedIfUnavailable');

  return (
    <>
      <FormSection>
        <Fieldset
          data-vendor-form-field="preferredStands"
          aria-invalid={Boolean(preferredStandsError)}
          aria-describedby={preferredStandsError ? PREFERRED_STANDS_ERROR_ID : undefined}
        >
          <FormFieldHeading title={t('vendorsFormPage.steps.preferredStands.title')} requirement="required" />
          <CheckboxRow htmlFor="wants_two_stands">
            <input
              id="wants_two_stands"
              type="checkbox"
              data-vendor-form-field="wantsTwoStands"
              checked={formData.wantsTwoStands}
              onChange={(event) => setWantsTwoStands(event.target.checked)}
            />
            <span>{t('vendorsFormPage.steps.preferredStands.twoStandsLabel')}</span>
          </CheckboxRow>
          <FieldHint>
            {formData.wantsTwoStands
              ? t('vendorsFormPage.steps.preferredStands.pairHint', { max: VENDOR_FORM_MAX_PREFERRED_STANDS })
              : t('vendorsFormPage.steps.preferredStands.hint', { max: VENDOR_FORM_MAX_PREFERRED_STANDS })}
          </FieldHint>
          <FieldHint>{t('vendorsFormPage.steps.preferredStands.orderHint')}</FieldHint>
          <FieldHint>
            {formData.wantsTwoStands
              ? t('vendorsFormPage.steps.preferredStands.pairCounter', {
                  current: Math.floor(formData.preferredStands.length / VENDOR_FORM_STANDS_PER_PAIR),
                  max: VENDOR_FORM_MAX_PREFERRED_STANDS
                })
              : t('vendorsFormPage.steps.preferredStands.counter', {
                  current: formData.preferredStands.length,
                  max: maxPreferredStands
                })}
          </FieldHint>
          <HallLayout>
            <HallMapColumn>
              <SelectableHall
                highInterestStandIds={highInterestStandIds}
                interestKnownStandIds={interestKnownStandIds}
                isDemandAvailable={isStandDemandAvailable}
                isPairMode={formData.wantsTwoStands}
                pairAnchorStandId={pairAnchorStandId}
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
                <LegendBadge>C</LegendBadge>
                <LegendText>
                  {t('vendorsFormPage.steps.preferredStands.cLabel')}
                  <LegendSize>{t('vendorsFormPage.steps.preferredStands.cSize')}</LegendSize>
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
              <LegendRow>
                <LegendSwatch $color={BackgroundColors.green.medium} $borderColor={BackgroundColors.green.medium} />
                <LegendText>{t('vendorsFormPage.steps.preferredStands.availableLabel')}</LegendText>
              </LegendRow>
              <LegendRow>
                <LegendSwatch
                  $color={BackgroundColors.green.medium}
                  $borderColor={BackgroundColors.green.medium}
                  $hasNoInterestFrame
                />
                <LegendText>
                  {t('vendorsFormPage.steps.preferredStands.noInterestLabel')}
                  <LegendSize>{t('vendorsFormPage.steps.preferredStands.noInterestHint')}</LegendSize>
                </LegendText>
              </LegendRow>
            </LegendCard>
          </HallLayout>
          {formData.wantsTwoStands && preferredStandGroups.length > 0 ? (
            <StandStatusList>
              {preferredStandGroups.map((standGroup, groupIndex) => (
                <StandStatusPill key={standGroup.join('-')}>
                  {t(
                    standGroup.length === VENDOR_FORM_STANDS_PER_PAIR
                      ? 'vendorsFormPage.steps.preferredStands.pairLabel'
                      : 'vendorsFormPage.steps.preferredStands.pairIncomplete',
                    { number: groupIndex + 1, stands: standGroup.join(' + ') }
                  )}
                </StandStatusPill>
              ))}
            </StandStatusList>
          ) : null}
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
          <FormFieldError id={PREFERRED_STANDS_ERROR_ID} message={preferredStandsError} />
        </Fieldset>
      </FormSection>

      <FormSection>
        <Fieldset>
          <FormFieldHeading title={t('vendorsFormPage.steps.interestedIfUnavailable.title')} requirement="required" />
          <RadioGroup
            role="radiogroup"
            data-vendor-form-field="interestedIfUnavailable"
            aria-invalid={Boolean(interestedIfUnavailableError)}
            aria-describedby={interestedIfUnavailableError ? INTERESTED_IF_UNAVAILABLE_ERROR_ID : undefined}
          >
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
          <FormFieldError id={INTERESTED_IF_UNAVAILABLE_ERROR_ID} message={interestedIfUnavailableError} />
        </Fieldset>
      </FormSection>

      <FormSection>
        <Fieldset>
          <FormFieldHeading title={t('vendorsFormPage.steps.sponsorshipInterest.title')} requirement="optional" />
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
