import { Icon as IconifyIcon } from '@iconify/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Picture } from '../components/Picture';
import { Title } from '../components/Title';
import { Button } from '../components/Button';
import { DropShadow, Radius } from '../styles/cards';
import { ScreenSize } from '../styles/screeen-size';
import { Spacings } from '../styles/spacings';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import PierwszaPomocUrlAvif from './../assets/images/workshops/pierwszapomoc.avif';
import PierwszaPomocUrl from './../assets/images/workshops/pierwszapomoc.jpg';
import PierwszaPomocUrlWebp from './../assets/images/workshops/pierwszapomoc.webp';
import { Text } from './MainPage.styled';
import { useTablet } from './usePhone';

const Root = styled.div`
  display: flex;
  z-index: 1;
  background-color: white;
  box-shadow: ${DropShadow.md};
  border-radius: ${Radius.lg};
  width: 600px;
  height: 600px;
  position: relative;

  @media (max-width: ${ScreenSize.tablet}) {
    width: 100%;
    align-items: center;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;

  padding: ${Spacings.md};
  align-items: center;
  justify-content: space-around;
  position: relative;
`;

export const TransparentIcon = styled.img`
  position: absolute;
  bottom: 0px;
  right: 20px;
  opacity: 0.2;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${Spacings.sm};
  text-align: center;
`;

const UnderlineButton = styled(Button)<{ isActive?: boolean }>`
  padding: ${Spacings.xs};
  border-bottom: 2px solid black;
  background-color: ${({ isActive }) => (isActive ? '#EFFFE8' : 'transparent')};
`;

const TrainingPlan = styled.div`
  padding: ${Spacings.md};
  height: 600px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const FirstAidCard = () => {
  const t = useTypedTranslation();
  const [showPlan, setShowPlan] = useState(false);
  const isTablet = useTablet();

  const logoStyle = isTablet
    ? { opacity: '0.27', position: 'absolute' as const, top: '5%', left: '50%', transform: 'translateX(-50%)' }
    : undefined;

  return (
    <Root>
      {showPlan ? (
        <TrainingPlan>
          <Button onClick={() => setShowPlan(false)}>
            <IconifyIcon
              icon="ion:arrow-back-outline"
              width={24}
              style={{ marginBottom: `${Spacings.md}` }}></IconifyIcon>
          </Button>

          <h3>{t('workshops.trainingPlan')}</h3>
          <Text bold>1. {t('workshops.firstAidLessons.lesson1')}</Text>
          <Text>{t('workshops.firstAidLessons.lessonDescription1')}</Text>

          <Text bold>2. {t('workshops.firstAidLessons.lesson2')}</Text>
          <Text>{t('workshops.firstAidLessons.lessonDescription2')}</Text>

          <Text bold>3. {t('workshops.firstAidLessons.lesson3')}</Text>
          <Text>{t('workshops.firstAidLessons.lessonDescription3')}</Text>

          <Text bold>4. {t('workshops.firstAidLessons.lesson4')}</Text>
          <Text>{t('workshops.firstAidLessons.lessonDescription4')}</Text>

          <Text bold>5. {t('workshops.firstAidLessons.lesson5')}</Text>
          <Text>{t('workshops.firstAidLessons.lessonDescription5')}</Text>
        </TrainingPlan>
      ) : (
        <MainContent>
          <Picture
            picture={{
              fallbackUrl: PierwszaPomocUrl,
              sources: [
                {
                  type: 'image/webp',
                  url: PierwszaPomocUrlWebp
                },
                {
                  type: 'image/avif',
                  url: PierwszaPomocUrlAvif
                }
              ]
            }}
            alt="firstaid"
            width={isTablet ? 180 : 100}
            style={logoStyle}
          />

          <TextWrapper>
            <Title>{t('workshops.firstAid')}</Title>
            <Text align="center">{t('workshops.firstAidDescription')}</Text>
          </TextWrapper>

          <UnderlineButton isActive={showPlan} onClick={() => setShowPlan(!showPlan)}>
            {t('workshops.trainingPlan')}
          </UnderlineButton>
        </MainContent>
      )}
    </Root>
  );
};
