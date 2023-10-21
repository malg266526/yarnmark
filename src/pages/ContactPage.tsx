import React from 'react';
import { Link } from '../components/Link';
import { Menu } from '../components/Menu';
import { Theme } from '../styles/theme';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import EmailImageUrl from './../assets/images/email.png';
import InstagramImageUrl from './../assets/images/instagram.png';
import { Card, Column, Content, Header, Image, Row, StyledH2, StyledH3, Text } from './ContactPage.styled';

const LinkAnchorProps = {
  color: Theme.secondary
};

export const ContactPage = () => {
  const t = useTypedTranslation();

  return (
    <div>
      <Header>
        <StyledH2>{t('contactPage.title')}</StyledH2>

        <Menu iconColor={Theme.secondary}>
          <Link href="/workshops" anchorProps={LinkAnchorProps}>
            {t('menu.workshops')}
          </Link>

          <Link href="/vendors" anchorProps={LinkAnchorProps}>
            {t('menu.vendors')}
          </Link>

          <Link href="/organizers" anchorProps={LinkAnchorProps}>
            {t('menu.organizers')}
          </Link>
        </Menu>
      </Header>

      <Content>
        <Card>
          <StyledH3>Dziergamy na polu</StyledH3>

          <Row>
            <Column>
              <Image width={80} src={EmailImageUrl} alt="logo" />
              <Text>dziergamynapolu@gmail.com</Text>
              {/* <a href="https://www.flaticon.com/free-icons/email" title="email icons">
            Email icons created by Smashicons - Flaticon
          </a> */}
            </Column>

            <Column>
              <Image width={80} src={InstagramImageUrl} alt="logo" />
              <Text>@dziergamynapolu</Text>

              {/* <a href="https://www.flaticon.com/free-icons/instagram" title="instagram icons">Instagram icons created by Freepik - Flaticon</a> */}
            </Column>
          </Row>
        </Card>
      </Content>
    </div>
  );
};
