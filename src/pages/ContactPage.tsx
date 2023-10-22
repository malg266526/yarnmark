import React from 'react';
import { Card } from '../components/Card';
import { Link } from '../components/Link';
import { Menu } from '../components/Menu';
import { Spacings } from '../styles/spacings';
import { Theme } from '../styles/theme';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import EmailImageUrl from './../assets/images/email.png';
import InstagramImageUrl from './../assets/images/instagram.png';
import Monia1ImageUrl from './../assets/images/Monia1.jpg';
import Monia2ImageUrl from './../assets/images/Monia2.jpg';
import Monia3ImageUrl from './../assets/images/Monia3.jpg';
import EwaImageUrl from './../assets/images/Ewa.jpg';
import AniaImageUrl from './../assets/images/Ania.jpg';
import AgataImageUrl from './../assets/images/Agata.jpg';
import GosiaImageUrl from './../assets/images/Gosia.jpg';
import {
  Column,
  Content,
  Header,
  Image,
  Page,
  PhotoImage,
  RowLayout,
  Separator,
  StyledH2,
  StyledH3,
  Text
} from './ContactPage.styled';

const LinkAnchorProps = {
  color: Theme.secondary
};

export const ContactPage = () => {
  const t = useTypedTranslation();

  return (
    <Page>
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
        <Card>
          <Column>
            <StyledH3>{t('contactPage.whoAreWe')}</StyledH3>

            <Text>{t('contactPage.welcome')}</Text>
            <RowLayout wide>
              <Column>
                <PhotoImage width={80} src={EwaImageUrl} alt="logo" />

                <Link
                  href="https://www.instagram.com/evvoola/"
                  target="_blank"
                  rel="noreferrer"
                  className="evvoola_instagram">
                  <Text>Ewa</Text>
                </Link>
              </Column>

              <Column>
                <PhotoImage width={80} src={Monia1ImageUrl} alt="logo" />

                <Link
                  href="https://www.instagram.com/written_by_yarn/"
                  target="_blank"
                  rel="noreferrer"
                  className="written_by_yarn_instagram">
                  <Text>Monika</Text>
                </Link>
              </Column>

              <Column>
                <PhotoImage width={80} src={Monia3ImageUrl} alt="logo" />

                <Link
                  href="https://www.instagram.com/by_ms.gomez/"
                  target="_blank"
                  rel="noreferrer"
                  className="by_ms.gomez_instagram">
                  <Text>Monika</Text>
                </Link>
              </Column>

              <Column>
                <PhotoImage width={80} src={AniaImageUrl} alt="logo" />

                <Link
                  href="https://www.instagram.com/ania_knittingnurse/"
                  target="_blank"
                  rel="noreferrer"
                  className="ania_knittingnurse_instagram">
                  <Text>Ania</Text>
                </Link>
              </Column>

              <Column>
                <PhotoImage width={80} src={GosiaImageUrl} alt="logo" />

                <Link
                  href="https://www.instagram.com/malgo_tylkoknit/"
                  target="_blank"
                  rel="noreferrer"
                  className="/malgo_tylkoknit_instagram">
                  <Text>Gosia</Text>
                </Link>
              </Column>

              <Column>
                <PhotoImage width={80} src={Monia2ImageUrl} alt="logo" />

                <Link
                  href="https://www.instagram.com/made_me_knit_it/"
                  target="_blank"
                  rel="noreferrer"
                  className="/made_me_knit_it_instagram">
                  <Text>Monia</Text>
                </Link>
              </Column>

              <Column>
                <PhotoImage width={80} src={AgataImageUrl} alt="logo" />

                <Link
                  href="https://www.instagram.com/sznurkami/"
                  target="_blank"
                  rel="noreferrer"
                  className="/sznurkami_instagram">
                  <Text>Agata</Text>
                </Link>
              </Column>
            </RowLayout>

            <Text>{t('contactPage.thatIs')}</Text>
            <Text margin={Spacings.sm}>{t('contactPage.description')}</Text>
          </Column>

          <Separator />

          <Column>
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
          </Column>
        </Card>
      </Content>
    </Page>
  );
};
