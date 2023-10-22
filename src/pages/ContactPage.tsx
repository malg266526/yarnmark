import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from '../components/Link';
import { Menu } from '../components/Menu';
import { Spacings } from '../styles/spacings';
import { Theme } from '../styles/theme';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import EmailImageUrl from './../assets/images/email.png';
import InstagramImageUrl from './../assets/images/instagram.png';
import { Card, Column, Content, Header, Image, RowLayout, StyledH2, StyledH3, Text } from './ContactPage.styled';

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
        <RowLayout wide>
          <Card width="40%">
            <StyledH3>{t('contactPage.writeToUs')}</StyledH3>

            <RowLayout wide>
              <Column>
                <Image width={80} src={EmailImageUrl} alt="logo" />
                <Text margin={Spacings.sm}>dziergamynapolu@gmail.com</Text>
                {/* <a href="https://www.flaticon.com/free-icons/email" title="email icons">
            Email icons created by Smashicons - Flaticon
          </a> */}
              </Column>

              <Column>
                <Image width={80} src={InstagramImageUrl} alt="logo" />
                <Text margin={Spacings.sm}>@dziergamynapolu</Text>

                {/* <a href="https://www.flaticon.com/free-icons/instagram" title="instagram icons">Instagram icons created by Freepik - Flaticon</a> */}
              </Column>
            </RowLayout>
          </Card>
          <Card width="40%">
            <StyledH3>{t('contactPage.whoAreWe')}</StyledH3>

            <Text>{t('contactPage.welcome')}</Text>

            <RowLayout wide>
              <RowLayout>
                <Link href="https://www.instagram.com/evvoola/" className="written_by_yarn">
                  <FontAwesomeIcon icon={faInstagram} size="1x" color={Theme.primary} />
                </Link>
                <Text>Ewa</Text>
              </RowLayout>

              <RowLayout>
                <Link href="https://www.instagram.com/written_by_yarn/" className="written_by_yarn">
                  <FontAwesomeIcon icon={faInstagram} size="1x" color={Theme.primary} />
                </Link>
                <Text>Monika</Text>
              </RowLayout>

              <RowLayout>
                <Link href="https://www.instagram.com/by_ms.gomez/" className="written_by_yarn">
                  <FontAwesomeIcon icon={faInstagram} size="1x" color={Theme.primary} />
                </Link>
                <Text>Monika</Text>
              </RowLayout>

              <RowLayout>
                <Link href="https://www.instagram.com/ania_knittingnurse/" className="written_by_yarn">
                  <FontAwesomeIcon icon={faInstagram} size="1x" color={Theme.primary} />
                </Link>
                <Text>Ania</Text>
              </RowLayout>

              <RowLayout>
                <Link href="https://www.instagram.com/malgo_tylkoknit/" className="written_by_yarn">
                  <FontAwesomeIcon icon={faInstagram} size="1x" color={Theme.primary} />
                </Link>
                <Text>Gosia</Text>
              </RowLayout>

              <RowLayout>
                <Link href="https://www.instagram.com/made_me_knit_it/" className="written_by_yarn">
                  <FontAwesomeIcon icon={faInstagram} size="1x" color={Theme.primary} />
                </Link>
                <Text>Monika</Text>
              </RowLayout>

              <RowLayout>
                <Link href="https://www.instagram.com/sznurkami/" className="written_by_yarn">
                  <FontAwesomeIcon icon={faInstagram} size="1x" color={Theme.primary} />
                </Link>
                <Text>Agata</Text>
              </RowLayout>
            </RowLayout>

            <Text>czyli DZIERGAMY NA POLU. </Text>
            <Text margin={Spacings.sm}>
              Kochamy wełnę, druty i szydełka. Od kilkunastu miesięcy organizujemy krakowskie spotkania dziewiarskie, a
              teraz przychodzimy do Was z targami! Mamy nadzieję, że będziecie się dobrze bawić :)
            </Text>
          </Card>
        </RowLayout>
      </Content>
    </div>
  );
};
