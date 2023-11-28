import React from 'react';
import styled from 'styled-components';
import { Card } from '../components/Card';
import { FlexColumnLayout } from '../components/FlexColumnLayout';
import { Link } from '../components/Link';
import { PageContent } from '../components/PageContent';
import { Spacings } from '../styles/spacings';
import MockLogo from './../assets/images/logo_wystawcy.png';

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: center;
  justify-content: center;
  gap: ${Spacings.sm};
  overflow: scroll;
`;

export const VendorsPage = () => {
  return (
    <PageContent variant="narrow">
      <Card flexDirection="row">
        <FlexColumnLayout>
          <Grid>
            <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
              <img width={200} src={MockLogo} alt="wystawca1" />
            </Link>

            <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
              <img width={200} src={MockLogo} alt="wystawca1" />
            </Link>

            <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
              <img width={200} src={MockLogo} alt="wystawca1" />
            </Link>

            <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
              <img width={200} src={MockLogo} alt="wystawca1" />
            </Link>

            <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
              <img width={200} src={MockLogo} alt="wystawca1" />
            </Link>

            <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
              <img width={200} src={MockLogo} alt="wystawca1" />
            </Link>

            <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
              <img width={200} src={MockLogo} alt="wystawca1" />
            </Link>

            <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
              <img width={200} src={MockLogo} alt="wystawca1" />
            </Link>

            <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
              <img width={200} src={MockLogo} alt="wystawca1" />
            </Link>
          </Grid>
        </FlexColumnLayout>
      </Card>
    </PageContent>
  );
};
