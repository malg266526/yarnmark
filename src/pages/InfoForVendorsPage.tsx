import React from 'react';
import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Card } from '../components/Card';
import { FlexColumnLayout } from '../components/FlexColumnLayout';
import { Colors } from '../styles/theme';
import { useTypedTranslation } from '../translations/useTypedTranslation';

export const FlexLayout = styled.div`
  display: flex;
  gap: ${Spacings.md};
  padding: ${Spacings.md};
`;

export const Root = styled.div`
  display: flex;
  flex: 1;
  padding: ${Spacings.md} 0 ${Spacings.lg} 0;
  width: 100%;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: ${Spacings.sm};
  border-bottom: 1px solid ${Colors.pinball};
`;

export const Title = styled.div`
  display: flex;
  width: 30%;
  font-weight: 700;
`;
export const Value = styled.div`
  display: flex;
  flex: 1;

  align-items: flex-start;
  align-self: flex-start;
`;

export const InfoForVendorsPage = () => {
  const t = useTypedTranslation();

  return (
    <Root>
      <Card width="100%">
        <FlexColumnLayout gap="none">
          <h3>{t('infoForVendorsPage.title')}</h3>

          <Row>
            <Title>Parking</Title>
            <Value>Każdemu wystawcy przysługuje darmowe miejsce parkingowe przy hali</Value>
          </Row>

          <Row>
            <Title>Hala</Title>
            <FlexColumnLayout padding="none">
              <Value>Otwarcie hali o godz. </Value>
              <Value>Każdy wystawca będzie miał do dyspozycji 2 krzesła oraz stół </Value>
            </FlexColumnLayout>
          </Row>

          <Row>
            <Title>Marketing</Title>
            <Value>
              Zachęcamy do przesłania swojego na logo na adres email strona.dziergamynapolu@gmail.com, umieścimy je w
              zakładce "Wystawcy" i w ten sposób poinformujemy dziewiarki i dziewiarzy, że z nami będziecie
            </Value>
          </Row>
        </FlexColumnLayout>
      </Card>
    </Root>
  );
};
