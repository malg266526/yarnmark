import React from 'react';
import { Typography } from '../../../components/Typography';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import {
  ErrorText,
  FieldLabel,
  Fieldset,
  FormSection,
  RadioGroup,
  RadioOption,
  TextInput
} from '../VendorFormPage.styled';
import type { VendorFormActions, VendorFormBindings } from './vendorFormViewContracts';

interface VendorFormBasicsSectionProps {
  formActions: Pick<VendorFormActions, 'setBooleanFieldValue' | 'setMainCategory'>;
  formBindings: VendorFormBindings;
}

export const VendorFormBasicsSection = ({ formActions, formBindings }: VendorFormBasicsSectionProps) => {
  const t = useTypedTranslation();
  const { formData, register, resolveFieldErrorMessage } = formBindings;
  const { setBooleanFieldValue, setMainCategory } = formActions;

  return (
    <>
      <FormSection $isFirst>
        <Fieldset>
          <Typography size="xl">{t('vendorsFormPage.steps.storeName.title')}</Typography>
          <FieldLabel htmlFor="store_name">
            {t('vendorsFormPage.steps.storeName.label')}
            <TextInput
              id="store_name"
              type="text"
              placeholder={t('vendorsFormPage.steps.storeName.placeholder')}
              {...register('storeName')}
            />
          </FieldLabel>
          {resolveFieldErrorMessage('storeName') ? (
            <ErrorText>{resolveFieldErrorMessage('storeName')}</ErrorText>
          ) : null}
        </Fieldset>
      </FormSection>

      <FormSection>
        <Fieldset>
          <Typography size="xl">{t('vendorsFormPage.steps.attendedBefore.title')}</Typography>
          <RadioGroup>
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
          {resolveFieldErrorMessage('attendedBefore') ? (
            <ErrorText>{resolveFieldErrorMessage('attendedBefore')}</ErrorText>
          ) : null}
        </Fieldset>
      </FormSection>

      <FormSection>
        <Fieldset>
          <Typography size="xl">{t('vendorsFormPage.steps.mainCategory.title')}</Typography>
          <RadioGroup>
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
          {formData.mainCategory === 'other' ? (
            <FieldLabel htmlFor="main_category_other">
              {t('vendorsFormPage.steps.mainCategory.otherLabel')}
              <TextInput
                id="main_category_other"
                type="text"
                placeholder={t('vendorsFormPage.steps.mainCategory.otherPlaceholder')}
                {...register('mainCategoryOther')}
              />
            </FieldLabel>
          ) : null}
          {resolveFieldErrorMessage('mainCategory', 'mainCategoryOther') ? (
            <ErrorText>{resolveFieldErrorMessage('mainCategory', 'mainCategoryOther')}</ErrorText>
          ) : null}
        </Fieldset>
      </FormSection>
    </>
  );
};
