import { SectionWrapper, Typography } from './MainPage.styled';
import { Band } from '../../components/Band';
import { Colors } from '../../styles/theme';
import React from 'react';
import { Trans } from 'react-i18next';
import { Link } from '../../components/Link';
import { useTypedTranslation } from '../../translations/useTypedTranslation';

// TODO: the whole band is todo - it will be completely new band
export const LastEditionSection = () => {
  const t = useTypedTranslation();

  return (
    <Band
      size="md"
      variant="background"
      color={Colors.pastelGray}
      padding="xl"
      narrowContent="fixed"
      overflowX="hidden">
      <SectionWrapper>
        <Typography size="xxl" weight="bold" paddingBottom="md">
          {t('buttonsBand.thankYou')}
        </Typography>

        <Typography size="lg" weight="regular" paddingBottom="sm">
          <Trans
            i18nKey="buttonsBand.fillTheSurvey"
            components={[
              <Link
                target="_blank"
                to="https://docs.google.com/forms/d/e/1FAIpQLSciBZoXDEmQdk4wCmWJC3Bg7ME4O6EfyYg1b9gpF0N01DXwTg/viewform"
              />
            ]}
          />
        </Typography>
      </SectionWrapper>
    </Band>
  );
};
