import React from 'react';
import styled from 'styled-components';
import { Spacings } from '../styles/spacings';
import { Card } from '../components/Card';
import { FlexColumnLayout } from '../components/FlexColumnLayout';
import { Colors } from '../styles/theme';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { PageContent } from '../components/PageContent';

export const FlexLayout = styled.div`
  display: flex;
  gap: ${Spacings.md};
  padding: ${Spacings.md};
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
    <PageContent variant="narrow">
      <Card width="100%">
        <FlexColumnLayout gap="none">
          <h3>{t('infoForVendorsPage.title')}</h3>

          <h4>Serdecznie Was zapraszamy do wzięcia udziału w I edycji Krakoskiego Yarnmarku Wełny!</h4>
          <h5>Poniżej kilka informacji organizacyjnych dla Was</h5>

          <Row>
            <Title>Parking</Title>
            <Value>Każdemu wystawcy przysługuje darmowe miejsce parkingowe przy hali, w dniu targów</Value>
          </Row>

          <Row>
            <Title>Hala</Title>
            <FlexColumnLayout padding="none">
              <Value>Otwarcie hali o godz. 6:00 TODO: potwierdzic z cracovią </Value>
              <Value>
                Stoisko ma wymiary 3x4m i w ramach stoisko wystawca ma do dyspozycji stół o wymiarach 180x80cm oraz 2
                krzesła
              </Value>
              <Value>Jest możliwość wykupienia stoiska podwójnego</Value>
              <Value>Hala znajduje się na tym samym poziomie co parking</Value>
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
    </PageContent>
  );
};
