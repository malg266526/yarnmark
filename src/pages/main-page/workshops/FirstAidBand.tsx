import { BrownScale } from '../../../styles/theme';
import { BackgroundIcon, Drawer, Paragraph, PulseButton, Text } from '../MainPage.styled';
import { Button } from '../../../components/Button';
import { Icon as IconifyIcon } from '@iconify/react';
import { Picture } from '../../../components/Picture';
import olaImageUrlJpg from '../../../assets/images/pomagamOli.jpg';
import olaImageUrlWebp from '../../../assets/images/pomagamOli.webp';
import olaImageUrlAvif from '../../../assets/images/pomagamOli.avif';
import { FlexColumnLayout } from '../../../components/FlexColumnLayout';
import { RowLayout } from '../../../components/RowLayout';
import firstAidIcon from '../../../assets/backgrounds/firstAid3.svg';
import { FirstAidCard } from '../FirstAidCard';
import { Band } from '../../../components/Band';
import React, { useState } from 'react';
import { useFirstClick } from '../../../hooks/useFirstClick';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';

type FirstAidBandType = {
  id: string;
};

export const FirstAidBand = ({ id }: FirstAidBandType) => {
  const t = useTypedTranslation();

  const [isOlaDrawerOpened, setIsOlaDrawerOpened] = useState<boolean>(false);

  const { wasClickedBefore: wasSosClicked, handleClick: handleSosClick } = useFirstClick('sosPulse');

  return (
    <Band
      id={id}
      gap="xl"
      size="md"
      flexWrap="wrap"
      variant="background"
      justify="space-around"
      color={BrownScale[100]}
      padding="xl">
      <Drawer isOpen={isOlaDrawerOpened}>
        <Button aria-label="close-drawer-button" onClick={() => setIsOlaDrawerOpened(false)}>
          <IconifyIcon icon="mingcute:close-fill" />
        </Button>

        <Picture
          picture={{
            fallbackUrl: olaImageUrlJpg,
            sources: [
              {
                type: 'image/webp',
                url: olaImageUrlWebp
              },
              {
                type: 'image/avif',
                url: olaImageUrlAvif
              }
            ]
          }}
          alt="yarnmark_logo"
          width={320}
          height={450}
          style={{ alignSelf: 'center' }}
        />
      </Drawer>

      <FlexColumnLayout padding="none" gap="none">
        <Paragraph>
          <RowLayout>
            <PulseButton
              aria-label="pomagam-oli-button"
              shouldPulse={!wasSosClicked}
              onClick={() => {
                setIsOlaDrawerOpened(true);
                handleSosClick();
              }}>
              <IconifyIcon
                icon="noto:sos-button"
                width="88"
                style={{
                  filter: 'drop-shadow(2px 2px 15px rgba(255, 71, 62, 0.7))'
                }}
              />
            </PulseButton>

            <FlexColumnLayout padding="xs" gap="none" align="flex-start">
              <Text marginTop="xs">{t('firstAidBand.saveTheLife')}</Text>

              <IconifyIcon
                icon="fluent:arrow-reply-20-filled"
                width="40"
                color="#cf4a4a"
                style={{
                  transform: 'scaleY(-1)',
                  marginLeft: '18px'
                }}
              />
            </FlexColumnLayout>
          </RowLayout>
        </Paragraph>

        <Paragraph>
          <h4>"{t('workshops.firstAidQuote')}"</h4>
          <h5>Thomas Keneally</h5>
        </Paragraph>
      </FlexColumnLayout>

      <BackgroundIcon src={firstAidIcon} width={500} alt="first-aid-image" />
      <FirstAidCard />
    </Band>
  );
};
