import React, { useState } from 'react';
import styled from 'styled-components';
import { Text } from './MainPage.styled';
import { Spacings } from '../styles/spacings';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import PierwszaPomocUrlAvif from './../assets/images/workshops/pierwszapomoc.avif';
import PierwszaPomocUrl from './../assets/images/workshops/pierwszapomoc.jpg';
import PierwszaPomocUrlWebp from './../assets/images/workshops/pierwszapomoc.webp';
import { Picture } from '../components/Picture';
import { Title } from '../components/Title';
import { TransparentButton } from '../components/TransparentButton';
import { Icon as IconifyIcon } from '@iconify/react';
import firstAidIcon from './../assets/backgrounds/firstAid.svg';
import { ScreenSize } from '../styles/screeen-size';
import { usePhone } from './usePhone';

const Root = styled.div`
  display: flex;
  z-index: 20;
  background-color: white;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  width: 600px;
  height: 600px;
  position: relative;

  @media (max-width: ${ScreenSize.phone}) {
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

const UnderlineButton = styled(TransparentButton)<{ isActive?: boolean }>`
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
  const isPhone = usePhone();

  const logoStyle = isPhone
    ? { opacity: '0.27', position: 'absolute' as const, top: '5%', left: '50%', transform: 'translateX(-50%)' }
    : undefined;

  return (
    <Root>
      {showPlan ? (
        <TrainingPlan>
          <TransparentButton onClick={() => setShowPlan(false)}>
            <IconifyIcon
              icon="ion:arrow-back-outline"
              width={24}
              style={{ marginBottom: `${Spacings.md}` }}></IconifyIcon>
          </TransparentButton>

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
            width={100}
            style={logoStyle}
          />
          <TransparentIcon src={firstAidIcon} width={160} alt="first_aid_icon" />

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
