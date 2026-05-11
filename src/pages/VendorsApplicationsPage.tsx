import React from 'react';
import styled from 'styled-components';
import { Header } from './menu/Header';
import { PageContent } from '../components/PageContent';
import { Band } from '../components/bands/Band';
import { BackgroundColors } from '../styles/theme';
import { usePhone } from '../hooks/usePhone';
import { PlainInfo } from './for-vendors/ForVendorsPage.styled';
import { UtilityPageHeader } from '../components/UtilityPageHeader';
import { VendorsApplicationsView } from './vendors-applications/VendorsApplicationsView';
import { useVendorsApplications } from './vendors-applications/useVendorsApplications';
import { VendorsApplicationsPageStyled } from './vendors-applications/VendorsApplicationsPage.styled';

const CenteredPlainInfo = styled(PlainInfo)`
  align-items: center;
`;

const VendorsApplicationsPage: React.FC = () => {
  const isPhone = usePhone();
  const { applications, loading, error } = useVendorsApplications();

  return (
    <PageContent variant="wide" padding="none">
      <Header />

      <Band.NarrowColumn
        id="vendors_applications_content"
        gap="lg"
        size="xs"
        color={BackgroundColors.navigationBand}
        stretchOnMobile
        padding={isPhone ? 'sm' : 'xxl'}
      >
        <UtilityPageHeader kicker="Panel organizatorek" title="Zgłoszenia wystawców" />

        <CenteredPlainInfo>
          <VendorsApplicationsPageStyled>
            <VendorsApplicationsView applications={applications} loading={loading} error={error} />
          </VendorsApplicationsPageStyled>
        </CenteredPlainInfo>
      </Band.NarrowColumn>
    </PageContent>
  );
};

export default VendorsApplicationsPage;
