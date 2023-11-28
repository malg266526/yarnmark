import React from 'react';
import styled from 'styled-components';
import { PageContent } from '../components/PageContent';
import { Spacings } from '../styles/spacings';

export const FlexLayout = styled.div`
  display: flex;
  gap: ${Spacings.md};
`;

export const VipTicketsPage = () => {
  return (
    <PageContent variant="narrow">
      <FlexLayout>fdfd</FlexLayout>
    </PageContent>
  );
};
