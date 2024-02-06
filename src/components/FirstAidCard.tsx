import React, { useState } from 'react';
import styled from 'styled-components';
import { Text } from '../pages/MainPage.styled';
import { Spacings } from '../styles/spacings';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import PierwszaPomocUrlAvif from './../assets/images/workshops/pierwszapomoc.avif';
import PierwszaPomocUrl from './../assets/images/workshops/pierwszapomoc.jpg';
import PierwszaPomocUrlWebp from './../assets/images/workshops/pierwszapomoc.webp';
import { Picture } from './Picture';
import { Title } from './Title';
import { TransparentButton } from './TransparentButton';

const Root = styled.div`
  display: flex;
  z-index: 20;
  background-color: white;
  border: 2px solid darkblue;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  height: 600px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  color: black;

  padding: ${Spacings.md};
  align-items: center;
  justify-content: space-around;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${Spacings.sm};
`;

const UnderlineButton = styled(TransparentButton)<{ isActive?: boolean }>`
  padding: ${Spacings.xs};
  border-bottom: 2px solid black;
  background-color: ${({ isActive }) => (isActive ? '#EFFFE8' : 'transparent')};
`;

const TrainingPlan = styled.div`
  padding: ${Spacings.md};
  max-width: 600px;
  height: 600px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const FirstAidCard = () => {
  const t = useTypedTranslation();
  const [showPlan, setShowPlan] = useState(false);

  return (
    <Root>
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
          width={200}
        />
        <TextWrapper>
          <Title>{t('workshops.firstAid')}</Title>
          <Text align="center">{t('workshops.firstAidDescription')}</Text>
        </TextWrapper>

        <UnderlineButton isActive={showPlan} onClick={() => setShowPlan(!showPlan)}>
          {t('workshops.trainingPlan')}
        </UnderlineButton>
      </MainContent>
      {showPlan && (
        <TrainingPlan>
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
      )}
    </Root>
  );
};
