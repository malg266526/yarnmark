import React from 'react';
import styled from 'styled-components';
import { Card } from '../components/Card';
import { FlexColumnLayout } from '../components/FlexColumnLayout';
import { Link } from '../components/Link';
import { Spacings } from '../styles/spacings';
import MockLogo from './../assets/images/logo_wystawcy.png';

export const Root = styled.div`
  display: flex;
  flex: 1;
  padding: ${Spacings.md} 0 ${Spacings.lg} 0;
  width: 100%;
`;

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
    <Root>
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
    </Root>
  );
};
