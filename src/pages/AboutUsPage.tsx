import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon as IconifyIcon } from '@iconify/react';
import React from 'react';
import styled from 'styled-components';
import BootImageUrl from '../assets/images/but.png';
import DNPLogoUrl from '../assets/images/dnp_logo.jpg';
import WloczykijkiLogoUrl from '../assets/images/logoBUT.png';
import MeetingImageUrl from '../assets/images/spotkanie.jpg';
import { Card } from '../components/Card';
import { FlexColumnLayout } from '../components/FlexColumnLayout';
import { Link } from '../components/Link';
import { RowLayout } from '../components/RowLayout';
import { Event, Timeline } from '../components/Timeline';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import AniaImageUrl from './../assets/images/Ania.jpg';
import EwaImageUrl from './../assets/images/Ewa.jpg';
import GosiaImageUrl from './../assets/images/Gosia.jpg';
import Monia1ImageUrl from './../assets/images/Monia1.jpg';
import Monia2ImageUrl from './../assets/images/Monia3.jpg';
import { Root, Text } from './ContactPage.styled';

export const RoundedImage = styled.img`
  border-radius: 50%;
`;

export const StyledH4 = styled.h4`
  margin: 0;
`;

export const Avatar = styled.img`
  align-self: center;
  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.2),
    0 2px 5px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  cursor: pointer;
`;

export const AboutUsPage = () => {
  const t = useTypedTranslation();

  const events = [
    {
      date: 2018,
      icon: <IconifyIcon icon="game-icons:converse-shoe" width="30" />,
      content: <Text>{t('aboutUsPage.event2018')}</Text>,
      leftSlot: <img width="50px" src={BootImageUrl} alt="dnp" />
    },
    {
      date: 2022,
      icon: <IconifyIcon icon="tabler:coffee" width="30" />,
      content: <Text>{t('aboutUsPage.event2022')}</Text>,
      bottomSlot: <img width="120px" src={MeetingImageUrl} alt="dnp" />
    },
    {
      date: 2023,
      icon: <FontAwesomeIcon icon={faInstagram} size="2x" />,
      content: <Text>{t('aboutUsPage.event2023_1')}</Text>
    },
    {
      date: 2023,
      icon: <IconifyIcon icon="pepicons-pop:tree" width="30" />,
      content: <Text>{t('aboutUsPage.event2023_2')}</Text>
    },
    {
      date: 2024,
      icon: <IconifyIcon icon="la:dragon" width="30" />,
      content: <Text>{t('aboutUsPage.event2024')}</Text>,
      bottomSlot: (
        <RowLayout>
          <img width="100px" src={WloczykijkiLogoUrl} alt="wloczykijki" />
          <h3>X</h3>
          <RoundedImage width="80px" src={DNPLogoUrl} alt="dnp" />
        </RowLayout>
      )
    }
  ];

  return (
    <Root>
      <Card width="100%">
        <FlexColumnLayout gap="md">
          <FlexColumnLayout gap="xs" padding="none">
            <h3>{t('aboutUsPage.hi')}</h3>
            <Text>{t('aboutUsPage.hereIs')}</Text>
          </FlexColumnLayout>

          <RowLayout wide gap="xs">
            <Link href="https://www.instagram.com/evvoola/" target="_blank" rel="noreferrer">
              <FlexColumnLayout gap="sm" padding="none">
                <Avatar width={80} src={EwaImageUrl} alt="logo" />

                <StyledH4>Ewa</StyledH4>
              </FlexColumnLayout>
            </Link>

            <Link href="https://www.instagram.com/written_by_yarn/" target="_blank" rel="noreferrer">
              <FlexColumnLayout gap="sm" padding="none">
                <Avatar width={80} src={Monia1ImageUrl} alt="logo" />

                <StyledH4>Monika</StyledH4>
              </FlexColumnLayout>
            </Link>

            <Link href="https://www.instagram.com/by_ms.gomez/" target="_blank" rel="noreferrer">
              <FlexColumnLayout gap="sm" padding="none">
                <Avatar width={80} src={Monia2ImageUrl} alt="logo" />

                <StyledH4>Monika</StyledH4>
              </FlexColumnLayout>
            </Link>

            <Link href="https://www.instagram.com/ania_knittingnurse/" target="_blank" rel="noreferrer">
              <FlexColumnLayout gap="sm" padding="none">
                <Avatar width={80} src={AniaImageUrl} alt="logo" />
                <StyledH4>Ania</StyledH4>
              </FlexColumnLayout>
            </Link>

            <Link href="https://www.instagram.com/malgo_tylkoknit/" target="_blank" rel="noreferrer">
              <FlexColumnLayout gap="sm" padding="none">
                <Avatar width={80} src={GosiaImageUrl} alt="logo" />
                <StyledH4>Gosia</StyledH4>
              </FlexColumnLayout>
            </Link>

            <Link href="https://www.instagram.com/wloczykijki_sklep/" target="_blank" rel="noreferrer">
              <FlexColumnLayout gap="sm" padding="none">
                <Avatar width={80} src={BootImageUrl} alt="logo" />
                <StyledH4>Dagmara</StyledH4>
              </FlexColumnLayout>
            </Link>

            <Link href="https://www.instagram.com/wloczykijki_sklep/" target="_blank" rel="noreferrer">
              <FlexColumnLayout gap="sm" padding="none">
                <Avatar width={80} src={BootImageUrl} alt="logo" />
                <StyledH4>Justyna</StyledH4>
              </FlexColumnLayout>
            </Link>
          </RowLayout>

          <Timeline>
            {events.map((event: Event, index: number) => (
              <Timeline.Event key={index} event={event} index={index} />
            ))}
          </Timeline>
        </FlexColumnLayout>
      </Card>
    </Root>
  );
};
