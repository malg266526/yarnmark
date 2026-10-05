import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import {
  ErrorText,
  FieldHeading,
  FieldLabel,
  FieldLabelText,
  Fieldset,
  FormSection,
  RadioGroup,
  RadioOption,
  TextInput
} from '../VendorFormPage.styled';
import type { VendorFormActions, VendorFormBindings } from './vendorFormViewContracts';
import { VendorFormFieldRequirement } from './VendorFormFieldRequirement';

const STORE_NAME_ERROR_ID = 'vendor-store-name-error';
const ATTENDED_BEFORE_ERROR_ID = 'vendor-attended-before-error';
const MAIN_CATEGORY_ERROR_ID = 'vendor-main-category-error';
const MAIN_CATEGORY_OTHER_ERROR_ID = 'vendor-main-category-other-error';

interface VendorFormBasicsSectionProps {
  formActions: Pick<VendorFormActions, 'setBooleanFieldValue' | 'setMainCategory'>;
  formBindings: VendorFormBindings;
}

export const VendorFormBasicsSection = ({ formActions, formBindings }: VendorFormBasicsSectionProps) => {
  const t = useTypedTranslation();
  const { formData, register, resolveFieldErrorMessage } = formBindings;
  const { setBooleanFieldValue, setMainCategory } = formActions;
  const storeNameError = resolveFieldErrorMessage('storeName');
  const attendedBeforeError = resolveFieldErrorMessage('attendedBefore');
  const mainCategoryError = resolveFieldErrorMessage('mainCategory');
  const mainCategoryOtherError = resolveFieldErrorMessage('mainCategoryOther');

  return (
    <>
      <FormSection $isFirst>
        <Fieldset>
          <Typography size="xl">{t('vendorsFormPage.steps.storeName.title')}</Typography>
          <FieldLabel htmlFor="store_name">
            <FieldLabelText>
              {t('vendorsFormPage.steps.storeName.label')}
              <VendorFormFieldRequirement requirement="required" />
            </FieldLabelText>
            <TextInput
              id="store_name"
              type="text"
              data-vendor-form-field="storeName"
              aria-invalid={Boolean(storeNameError)}
              aria-describedby={storeNameError ? STORE_NAME_ERROR_ID : undefined}
              placeholder={t('vendorsFormPage.steps.storeName.placeholder')}
              {...register('storeName')}
            />
          </FieldLabel>
          {storeNameError ? <ErrorText id={STORE_NAME_ERROR_ID}>{storeNameError}</ErrorText> : null}
        </Fieldset>
      </FormSection>

      <FormSection>
        <Fieldset>
          <FieldHeading>
            <Typography size="xl">{t('vendorsFormPage.steps.attendedBefore.title')}</Typography>
            <VendorFormFieldRequirement requirement="required" />
          </FieldHeading>
          <RadioGroup
            role="radiogroup"
            data-vendor-form-field="attendedBefore"
            aria-invalid={Boolean(attendedBeforeError)}
            aria-describedby={attendedBeforeError ? ATTENDED_BEFORE_ERROR_ID : undefined}
          >
            <RadioOption>
              <input
                type="radio"
                name="attended_before"
                checked={formData.attendedBefore === true}
                onChange={() => setBooleanFieldValue('attendedBefore', true)}
              />
              <span>{t('vendorsFormPage.steps.attendedBefore.yes')}</span>
            </RadioOption>
            <RadioOption>
              <input
                type="radio"
                name="attended_before"
                checked={formData.attendedBefore === false}
                onChange={() => setBooleanFieldValue('attendedBefore', false)}
              />
              <span>{t('vendorsFormPage.steps.attendedBefore.no')}</span>
            </RadioOption>
          </RadioGroup>
          {attendedBeforeError ? <ErrorText id={ATTENDED_BEFORE_ERROR_ID}>{attendedBeforeError}</ErrorText> : null}
        </Fieldset>
      </FormSection>

      <FormSection>
        <Fieldset>
          <FieldHeading>
            <Typography size="xl">{t('vendorsFormPage.steps.mainCategory.title')}</Typography>
            <VendorFormFieldRequirement requirement="required" />
          </FieldHeading>
          <RadioGroup
            role="radiogroup"
            data-vendor-form-field="mainCategory"
            aria-invalid={Boolean(mainCategoryError)}
            aria-describedby={mainCategoryError ? MAIN_CATEGORY_ERROR_ID : undefined}
          >
            <RadioOption>
              <input
                type="radio"
                name="main_category"
                checked={formData.mainCategory === 'yarns'}
                onChange={() => setMainCategory('yarns')}
              />
              <span>{t('vendorsFormPage.steps.mainCategory.yarns')}</span>
            </RadioOption>
            <RadioOption>
              <input
                type="radio"
                name="main_category"
                checked={formData.mainCategory === 'accessories'}
                onChange={() => setMainCategory('accessories')}
              />
              <span>{t('vendorsFormPage.steps.mainCategory.accessories')}</span>
            </RadioOption>
            <RadioOption>
              <input
                type="radio"
                name="main_category"
                checked={formData.mainCategory === 'ceramics'}
                onChange={() => setMainCategory('ceramics')}
              />
              <span>{t('vendorsFormPage.steps.mainCategory.ceramics')}</span>
            </RadioOption>
            <RadioOption>
              <input
                type="radio"
                name="main_category"
                checked={formData.mainCategory === 'candles'}
                onChange={() => setMainCategory('candles')}
              />
              <span>{t('vendorsFormPage.steps.mainCategory.candles')}</span>
            </RadioOption>
            <RadioOption>
              <input
                type="radio"
                name="main_category"
                checked={formData.mainCategory === 'other'}
                onChange={() => setMainCategory('other')}
              />
              <span>{t('vendorsFormPage.steps.mainCategory.other')}</span>
            </RadioOption>
          </RadioGroup>
          {mainCategoryError ? <ErrorText id={MAIN_CATEGORY_ERROR_ID}>{mainCategoryError}</ErrorText> : null}
          {formData.mainCategory === 'other' ? (
            <>
              <FieldLabel htmlFor="main_category_other">
                <FieldLabelText>
                  {t('vendorsFormPage.steps.mainCategory.otherLabel')}
                  <VendorFormFieldRequirement requirement="required" />
                </FieldLabelText>
                <TextInput
                  id="main_category_other"
                  type="text"
                  data-vendor-form-field="mainCategoryOther"
                  aria-invalid={Boolean(mainCategoryOtherError)}
                  aria-describedby={mainCategoryOtherError ? MAIN_CATEGORY_OTHER_ERROR_ID : undefined}
                  placeholder={t('vendorsFormPage.steps.mainCategory.otherPlaceholder')}
                  {...register('mainCategoryOther')}
                />
              </FieldLabel>
              {mainCategoryOtherError ? (
                <ErrorText id={MAIN_CATEGORY_OTHER_ERROR_ID}>{mainCategoryOtherError}</ErrorText>
              ) : null}
            </>
          ) : null}
        </Fieldset>
      </FormSection>
    </>
  );
};
