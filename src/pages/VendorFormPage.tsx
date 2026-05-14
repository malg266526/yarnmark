import React from 'react';
import styled from 'styled-components';
import { BackgroundColors } from '../styles/theme';
import { Header } from './menu/Header';
import { PageContent } from '../components/PageContent';
import { Band } from '../components/bands/Band';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { usePhone } from '../hooks/usePhone';
import { PlainInfo } from './for-vendors/ForVendorsPage.styled';
import { VendorFormView } from './vendor-form/components/VendorFormView';
import { useVendorForm } from './vendor-form/hooks/useVendorForm';
import { UtilityPageHeader } from '../components/UtilityPageHeader';

const CenteredPlainInfo = styled(PlainInfo)`
  align-items: center;
`;

export const VendorFormPage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();
  const vendorFormViewProps = useVendorForm();

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
          <VendorFormView {...vendorFormViewProps} />
        </CenteredPlainInfo>
      </Band.NarrowColumn>
    </PageContent>
  );
};
