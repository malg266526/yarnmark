import React from 'react';
import { Link } from '../components/Link';
import { Menu } from '../components/Menu';
import { Theme } from '../styles/theme';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import EmailImageUrl from './../assets/images/email.png';
import InstagramImageUrl from './../assets/images/instagram.png';
import { Card, Column, Content, Header, Image, Pair, Row, StyledH2, StyledH3, Text } from './ContactPage.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Spacings } from '../styles/spacings';

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
        <Row>
          <Card width="40%">
            <StyledH3>{t('contactPage.writeToUs')}</StyledH3>

            <Row>
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
            </Row>
          </Card>
          <Card width="40%">
            <StyledH3>{t('contactPage.whoAreWe')}</StyledH3>

            <Text>{t('contactPage.welcome')}</Text>

            <Row>
              <Pair>
                <Link href="https://www.instagram.com/evvoola/" className="written_by_yarn">
                  <FontAwesomeIcon icon={faInstagram} size="1x" color={Theme.primary} />
                </Link>
                <Text>Ewa</Text>
              </Pair>

              <Pair>
                <Link href="https://www.instagram.com/written_by_yarn/" className="written_by_yarn">
                  <FontAwesomeIcon icon={faInstagram} size="1x" color={Theme.primary} />
                </Link>
                <Text>Monika</Text>
              </Pair>

              <Pair>
                <Link href="https://www.instagram.com/by_ms.gomez/" className="written_by_yarn">
                  <FontAwesomeIcon icon={faInstagram} size="1x" color={Theme.primary} />
                </Link>
                <Text>Monika</Text>
              </Pair>

              <Pair>
                <Link href="https://www.instagram.com/ania_knittingnurse/" className="written_by_yarn">
                  <FontAwesomeIcon icon={faInstagram} size="1x" color={Theme.primary} />
                </Link>
                <Text>Ania</Text>
              </Pair>

              <Pair>
                <Link href="https://www.instagram.com/malgo_tylkoknit/" className="written_by_yarn">
                  <FontAwesomeIcon icon={faInstagram} size="1x" color={Theme.primary} />
                </Link>
                <Text>Gosia</Text>
              </Pair>

              <Pair>
                <Link href="https://www.instagram.com/made_me_knit_it/" className="written_by_yarn">
                  <FontAwesomeIcon icon={faInstagram} size="1x" color={Theme.primary} />
                </Link>
                <Text>Monika</Text>
              </Pair>

              <Pair>
                <Link href="https://www.instagram.com/sznurkami/" className="written_by_yarn">
                  <FontAwesomeIcon icon={faInstagram} size="1x" color={Theme.primary} />
                </Link>
                <Text>Agata</Text>
              </Pair>
            </Row>

            <Text>czyli DZIERGAMY NA POLU. </Text>
            <Text margin={Spacings.sm}>
              Kochamy wełnę, druty i szydełka. Od kilkunastu miesięcy organizujemy krakowskie spotkania dziewiarskie, a
              teraz przychodzimy do Was z targami! Mamy nadzieję, że będziecie się dobrze bawić :)
            </Text>
          </Card>
        </Row>
      </Content>
    </div>
  );
};
