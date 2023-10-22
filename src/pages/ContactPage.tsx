import React from 'react';
import { Card } from '../components/Card';
import { Link } from '../components/Link';
import { Menu } from '../components/Menu';
import { Colors } from '../styles/theme';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import AgataImageUrl from './../assets/images/Agata.jpg';
import AniaImageUrl from './../assets/images/Ania.jpg';
import EwaImageUrl from './../assets/images/Ewa.jpg';
import GosiaImageUrl from './../assets/images/Gosia.jpg';
import Monia1ImageUrl from './../assets/images/Monia1.jpg';
import Monia2ImageUrl from './../assets/images/Monia2.jpg';
import Monia3ImageUrl from './../assets/images/Monia3.jpg';
import EmailImageUrl from './../assets/images/email.png';
import InstagramImageUrl from './../assets/images/instagram.png';
import {
  Avatar,
  Column,
  Content,
  Header,
  Image,
  Page,
  RowLayout,
  Separator,
  StyledH2,
  StyledH3,
  Text
} from './ContactPage.styled';

const LinkAnchorProps = {
  color: Colors.spruce
};

export const ContactPage = () => {
  const t = useTypedTranslation();

  return (
    <Page>
      <Header>
        <StyledH2>{t('contactPage.title')}</StyledH2>

        <Menu iconColor={Colors.spruce}>
          <Link href="/" anchorProps={LinkAnchorProps}>
            {t('menu.home')}
          </Link>

          <Link href="/workshops" anchorProps={LinkAnchorProps}>
            {t('menu.workshops')}
          </Link>

          <Link href="/vendors" anchorProps={LinkAnchorProps}>
            {t('menu.vendors')}
          </Link>
        </Menu>
      </Header>

      <Content>
        <Card>
          <Column>
            <StyledH3>{t('contactPage.whoAreWe')}</StyledH3>

            <Text>{t('contactPage.welcome')}</Text>
            <RowLayout wide>
              <Link href="https://www.instagram.com/evvoola/" target="_blank" rel="noreferrer">
                <Column>
                  <Avatar width={80} src={EwaImageUrl} alt="logo" />

                  <Text>Ewa</Text>
                </Column>
              </Link>

              <Link href="https://www.instagram.com/written_by_yarn/" target="_blank" rel="noreferrer">
                <Column>
                  <Avatar width={80} src={Monia1ImageUrl} alt="logo" />

                  <Text>Monika</Text>
                </Column>
              </Link>

              <Link href="https://www.instagram.com/by_ms.gomez/" target="_blank" rel="noreferrer">
                <Column>
                  <Avatar width={80} src={Monia3ImageUrl} alt="logo" />

                  <Text>Monika</Text>
                </Column>
              </Link>

              <Link href="https://www.instagram.com/ania_knittingnurse/" target="_blank" rel="noreferrer">
                <Column>
                  <Avatar width={80} src={AniaImageUrl} alt="logo" />

                  <Text>Ania</Text>
                </Column>
              </Link>

              <Link href="https://www.instagram.com/malgo_tylkoknit/" target="_blank" rel="noreferrer">
                <Column>
                  <Avatar width={80} src={GosiaImageUrl} alt="logo" />

                  <Text>Gosia</Text>
                </Column>
              </Link>

              <Link href="https://www.instagram.com/made_me_knit_it/" target="_blank" rel="noreferrer">
                <Column>
                  <Avatar width={80} src={Monia2ImageUrl} alt="logo" />

                  <Text>Monia</Text>
                </Column>
              </Link>

              <Link href="https://www.instagram.com/sznurkami/" target="_blank" rel="noreferrer">
                <Column>
                  <Avatar width={80} src={AgataImageUrl} alt="logo" />
                  <Text>Agata</Text>
                </Column>
              </Link>
            </RowLayout>

            <Text>{t('contactPage.thatIs')}</Text>
            <Text margin="sm">{t('contactPage.description')}</Text>
          </Column>

          <Separator />

          <Column>
            <StyledH3>{t('contactPage.writeToUs')}</StyledH3>

            <RowLayout wide>
              <Column>
                <Image width={80} src={EmailImageUrl} alt="logo" />
                <Text margin="sm">dziergamynapolu@gmail.com</Text>
                {/* <a href="https://www.flaticon.com/free-icons/email" title="email icons">
            Email icons created by Smashicons - Flaticon
          </a> */}
              </Column>

              <Column>
                <Image width={80} src={InstagramImageUrl} alt="logo" />
                <Text margin="sm">@dziergamynapolu</Text>

                {/* <a href="https://www.flaticon.com/free-icons/instagram" title="instagram icons">Instagram icons created by Freepik - Flaticon</a> */}
              </Column>
            </RowLayout>
          </Column>
        </Card>
      </Content>
    </Page>
  );
};
