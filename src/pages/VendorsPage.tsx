import React from 'react';
import styled from 'styled-components';
import { Card } from '../components/Card';
import { FlexColumnLayout } from '../components/FlexColumnLayout';
import { Link } from '../components/Link';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import MockLogo from './../assets/images/logo_wystawcy.png';
import { StyledH3 } from './ContactPage.styled';

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: center;
  justify-content: center;
  gap: ${Spacings.sm};
`;

export const Separator = styled.div`
  margin: ${Spacings.md} 0;
  border-right: 1px solid ${Colors.pinball};
`;

export const InformationForVendors = styled.div`
  width: 300px;
  padding: ${Spacings.sm};
`;

export const VendorsPage = () => {
  const t = useTypedTranslation();

  return (
    <>
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

        <Separator />

        <FlexColumnLayout>
          <InformationForVendors>
            <StyledH3>{t('vandorsPage.infoForVendors')}:</StyledH3>
            <StyledH3> todo: przenieś do osobnej zakładki</StyledH3>
          </InformationForVendors>
        </FlexColumnLayout>
      </Card>
    </>
  );
};
