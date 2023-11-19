import React from 'react';
import { Card } from '../components/Card';
import { useTypedTranslation } from '../translations/useTypedTranslation';

import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-vertical-timeline-component/style.min.css';
import WloczykijkiLogoUrl from '../assets/images/wloczykijki_logo.png';
import { FlexColumnLayout } from '../components/FlexColumnLayout';
import { Image, Root, RowLayout, Text } from './ContactPage.styled';
import { Timeline } from '../components/Timeline';

export const ContactPage = () => {
  const t = useTypedTranslation();

  return (
    <Root>
      <Card width="100%">
        <FlexColumnLayout gap="none">
          <h3>{t('contactPage.hi')}</h3>
          <Text>{t('contactPage.hereIs')}</Text>
          <RowLayout>
            <Image width="200px" src={WloczykijkiLogoUrl} alt="wloczykijki" />
            <h3>X</h3>
          </RowLayout>

          <Timeline
            events={[
              {
                date: 2018,
                icon: <FontAwesomeIcon icon={faCartShopping} size="lg" />,
                content: <Text>{t('contactPage.aboutUsWloczykijki')}</Text>
              },
              {
                date: 2022,
                icon: <FontAwesomeIcon icon={faCartShopping} size="lg" />,
                content: <Text>{t('contactPage.aboutUsDNP')}</Text>
              },
              {
                date: 2023,
                icon: <FontAwesomeIcon icon={faCartShopping} size="lg" />,
                content: <Text>Powstaje Dziergamy na polu</Text>
              },
              {
                date: 2023,
                icon: <FontAwesomeIcon icon={faCartShopping} size="lg" />,
                content: (
                  <Text>
                    Pierwsze spotkanie Włóczykijków i Dziergamy na polu przy okazji Światowego Dnia dziergania w
                    miejscach publicznych
                  </Text>
                )
              },
              {
                date: 2024,
                icon: <FontAwesomeIcon icon={faCartShopping} size="lg" />,
                content: <Text>Pierwsze targi w Krakowie!</Text>
              }
            ]}
          />
        </FlexColumnLayout>

        {/* <RowLayout wide>
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
          </RowLayout> */}

        {/*  <Separator /> */}

        {/* <Column>
          <StyledH3>{t('contactPage.writeToUs')}</StyledH3>

          <RowLayout wide>
            <Column>
              <ImageBox>
                <Image width={80} src={Email3DImageUrl} alt="logo" />
              </ImageBox>
              <Text margin="sm">dziergamynapolu@gmail.com</Text>
              {/* <a href="https://www.flaticon.com/free-icons/email" title="email icons">
            Email icons created by Smashicons - Flaticon
          </a> */}
        {/*             </Column>

            <Column>
              <ImageBox>
                <Image width={60} src={InstagramImageUrl} alt="logo" />
              </ImageBox>

              <Text margin="sm">@dziergamynapolu</Text>

              {/* <a href="https://www.flaticon.com/free-icons/instagram" title="instagram icons">Instagram icons created by Freepik - Flaticon</a> */}
        {/*     </Column>
          </RowLayout>
        </Column> */}
      </Card>
    </Root>
  );
};
