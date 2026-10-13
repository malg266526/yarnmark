import React from 'react';
import { Band } from '../../../components/bands/Band';
import { CtaButton } from '../../../components/Button';
import { FormField } from '../../../components/form/FormField';
import { TextInput } from '../../../components/form/FormField.styled';
import { Typography } from '../../../components/Typography';
import { usePhone } from '../../../hooks/usePhone';
import { BackgroundColors } from '../../../styles/theme';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { NewsletterField, NewsletterForm, NewsletterSuccess, PlainInfo } from '../ForVendorsPage.styled';
import { useNewsletterForm } from '../hooks/useNewsletterForm';

const NEWSLETTER_EMAIL_INPUT_ID = 'newsletter_email';
const NEWSLETTER_EMAIL_ERROR_ID = 'newsletter-email-error';

export const NewsletterSection = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();
  const { email, status, validationKey, onEmailChange, onSubmit } = useNewsletterForm();

  const isSubmitting = status === 'submitting';
  const errorMessage = validationKey
    ? t(validationKey)
    : status === 'error'
      ? t('infoForVendorsPage.newsletter.submitError')
      : undefined;

  return (
    <Band.NarrowColumn
      id="newsletter"
      gap="lg"
      size="xs"
      color={BackgroundColors.navigationBand}
      stretchOnMobile
      padding={isPhone ? 'sm' : 'xxl'}
    >
      <Band.BeamTitle>{t('infoForVendorsPage.newsletter.title')}</Band.BeamTitle>

      <PlainInfo>
        <Typography size="md">{t('infoForVendorsPage.newsletter.description')}</Typography>

        <NewsletterForm onSubmit={onSubmit} noValidate>
          <NewsletterField>
            <FormField
              htmlFor={NEWSLETTER_EMAIL_INPUT_ID}
              label={t('infoForVendorsPage.newsletter.emailLabel')}
              requirement="required"
              error={errorMessage}
              errorId={NEWSLETTER_EMAIL_ERROR_ID}
            >
              <TextInput
                id={NEWSLETTER_EMAIL_INPUT_ID}
                type="email"
                value={email}
                disabled={isSubmitting}
                aria-invalid={Boolean(errorMessage)}
                aria-describedby={errorMessage ? NEWSLETTER_EMAIL_ERROR_ID : undefined}
                placeholder={t('infoForVendorsPage.newsletter.emailPlaceholder')}
                onChange={(event) => onEmailChange(event.target.value)}
              />
            </FormField>
          </NewsletterField>

          <CtaButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('infoForVendorsPage.newsletter.submitting') : t('infoForVendorsPage.newsletter.submit')}
          </CtaButton>

          {status === 'success' ? (
            <NewsletterSuccess role="status">{t('infoForVendorsPage.newsletter.success')}</NewsletterSuccess>
          ) : null}
        </NewsletterForm>
      </PlainInfo>
    </Band.NarrowColumn>
  );
};
