import React from 'react';
import styled from 'styled-components';
import { BackgroundColors } from '../styles/theme';
import { Header } from './menu/Header';
import { PageContent } from '../components/PageContent';
import { Band } from '../components/bands/Band';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { usePhone } from '../hooks/usePhone';
import { PlainInfo } from './for-vendors/ForVendorsPage.styled';
import { VendorsFormView } from './vendors-form/VendorsFormView';
import { useVendorsForm } from './vendors-form/useVendorsForm';
import { UtilityPageHeader } from '../components/UtilityPageHeader';

const CenteredPlainInfo = styled(PlainInfo)`
  align-items: center;
`;

export const VendorsFormPage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();
  const form = useVendorsForm();

  return (
    <PageContent variant="wide" padding="none">
      <Header />

      <Band.NarrowColumn
        id="vendors_form_content"
        gap="lg"
        size="xs"
        color={BackgroundColors.navigationBand}
        stretchOnMobile
        padding={isPhone ? 'sm' : 'xxl'}
      >
        <UtilityPageHeader kicker={t('vendorsFormPage.kicker')} title={t('vendorsFormPage.title')} />

        <CenteredPlainInfo>
          <VendorsFormView {...form} />
        </CenteredPlainInfo>
      </Band.NarrowColumn>
    </PageContent>
  );
};
