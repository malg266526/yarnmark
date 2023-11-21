import { Icon as IconifyIcon } from '@iconify/react';
import React from 'react';
import DNPLogoUrl from '../assets/images/dnp_logo.jpg';
import WloczykijkiLogoUrl from '../assets/images/wloczykijki_logo.png';
import { Card } from '../components/Card';
import { FlexColumnLayout } from '../components/FlexColumnLayout';
import { Timeline } from '../components/Timeline';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { Root, RoundedImage, RowLayout, Text } from './ContactPage.styled';

export const AboutUsPage = () => {
  const t = useTypedTranslation();

  return (
    <Root>
      <Card width="100%">
        <FlexColumnLayout gap="md">
          <FlexColumnLayout gap="xs">
            <h3>{t('aboutUsPage.hi')}</h3>
            <Text>{t('aboutUsPage.hereIs')}</Text>
          </FlexColumnLayout>

          <RowLayout>
            <img width="200px" src={WloczykijkiLogoUrl} alt="wloczykijki" />
            <h3>X</h3>
            <RoundedImage width="160px" src={DNPLogoUrl} alt="dnp" />
          </RowLayout>

          <Timeline
            events={[
              {
                date: 2018,
                icon: <IconifyIcon icon="game-icons:converse-shoe" width="30" />,
                content: <Text>{t('aboutUsPage.event2018')}</Text>
              },
              {
                date: 2022,
                icon: <IconifyIcon icon="tabler:coffee" width="30" />,
                content: <Text>{t('aboutUsPage.event2022')}</Text>
              },
              {
                date: 2023,
                icon: <IconifyIcon icon="pepicons-pop:tree" width="30" />,
                content: <Text>{t('aboutUsPage.event2023')}</Text>
              },
              {
                date: 2023,
                icon: <IconifyIcon icon="la:dragon" width="30" />,
                content: <Text>{t('aboutUsPage.event2024')}</Text>
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
