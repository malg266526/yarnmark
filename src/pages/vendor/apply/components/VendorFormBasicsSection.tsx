import React from 'react';
import { Typography } from '../../../../components/Typography';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { FormField } from '../../../../components/form/FormField';
import { FormFieldError } from '../../../../components/form/FormFieldError';
import { FormFieldHeading } from '../../../../components/form/FormFieldHeading';
import { Fieldset, FormSection, RadioGroup, RadioOption, TextInput } from '../VendorFormPage.styled';
import type { VendorFormActions, VendorFormBindings } from './vendorFormViewContracts';

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
          <FormField
            htmlFor="store_name"
            label={t('vendorsFormPage.steps.storeName.label')}
            requirement="required"
            error={storeNameError}
            errorId={STORE_NAME_ERROR_ID}
          >
            <TextInput
              id="store_name"
              type="text"
              data-vendor-form-field="storeName"
              aria-invalid={Boolean(storeNameError)}
              aria-describedby={storeNameError ? STORE_NAME_ERROR_ID : undefined}
              placeholder={t('vendorsFormPage.steps.storeName.placeholder')}
              {...register('storeName')}
            />
          </FormField>
        </Fieldset>
      </FormSection>

      <FormSection>
        <Fieldset>
          <FormFieldHeading title={t('vendorsFormPage.steps.attendedBefore.title')} requirement="required" />
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
          <FormFieldError id={ATTENDED_BEFORE_ERROR_ID} message={attendedBeforeError} />
        </Fieldset>
      </FormSection>

      <FormSection>
        <Fieldset>
          <FormFieldHeading title={t('vendorsFormPage.steps.mainCategory.title')} requirement="required" />
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
          <FormFieldError id={MAIN_CATEGORY_ERROR_ID} message={mainCategoryError} />
          {formData.mainCategory === 'other' ? (
            <FormField
              htmlFor="main_category_other"
              label={t('vendorsFormPage.steps.mainCategory.otherLabel')}
              requirement="required"
              error={mainCategoryOtherError}
              errorId={MAIN_CATEGORY_OTHER_ERROR_ID}
            >
              <TextInput
                id="main_category_other"
                type="text"
                data-vendor-form-field="mainCategoryOther"
                aria-invalid={Boolean(mainCategoryOtherError)}
                aria-describedby={mainCategoryOtherError ? MAIN_CATEGORY_OTHER_ERROR_ID : undefined}
                placeholder={t('vendorsFormPage.steps.mainCategory.otherPlaceholder')}
                {...register('mainCategoryOther')}
              />
            </FormField>
          ) : null}
        </Fieldset>
      </FormSection>
    </>
  );
};
