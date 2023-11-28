import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card } from '../components/Card';
import { FlexColumnLayout } from '../components/FlexColumnLayout';
import { Link } from '../components/Link';
import { PageContent } from '../components/PageContent';
import { RowLayout } from '../components/RowLayout';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { Text } from './ContactPage.styled';

export const ContactPage = () => {
  const t = useTypedTranslation();

  return (
    <PageContent variant="narrow">
      <Card width="100%">
        <FlexColumnLayout gap="xs">
          <h3>{t('contactPage.writeToUs')}</h3>

          <FlexColumnLayout>
            <FontAwesomeIcon icon={faEnvelope} size="3x" />
            <Text>krakoski.yarnmark.welny@gmail.com</Text>
          </FlexColumnLayout>

          <RowLayout wide>
            <Link
              href="https://www.instagram.com/dziergamynapolu/"
              className="instagram_social"
              anchorProps={{ color: 'black' }}>
              <FlexColumnLayout>
                <FontAwesomeIcon icon={faInstagram} size="3x" />
                <Text>@dziergamynapolu</Text>
              </FlexColumnLayout>
            </Link>

            <Link
              href="https://www.instagram.com/wloczykijki_sklep/"
              className="instagram_social"
              anchorProps={{ color: 'black' }}>
              <FlexColumnLayout>
                <FontAwesomeIcon icon={faInstagram} size="3x" />
                <Text>@wloczykijki_sklep</Text>
              </FlexColumnLayout>
            </Link>
          </RowLayout>
        </FlexColumnLayout>
      </Card>
    </PageContent>
  );
};
