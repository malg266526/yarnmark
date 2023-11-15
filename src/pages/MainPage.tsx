import React from 'react';
import { Button } from '../components/Button';
import { FlexColumnLayout } from '../components/FlexColumnLayout';
import { LinkButton, RowLayout, StyledH1, StyledH2, Root, Box, Text } from './MainPage.styled';
import { useTypedTranslation } from '../translations/useTypedTranslation';

export const MainPage = () => {
  const t = useTypedTranslation();

  return (
    <Root>
      <FlexColumnLayout fullHeight justifyContent="space-between">
        <FlexColumnLayout gap="sm">
          <StyledH2>{t('mainPage.firstTime')} </StyledH2>
          <StyledH1>{t('mainPage.fairName')}</StyledH1>
          <LinkButton href="https://google.com" target="_blank" rel="noreferrer">
            <Button>{t('mainPage.buyTicket')}</Button>
          </LinkButton>
        </FlexColumnLayout>

        <RowLayout>
          <Box>
            <FlexColumnLayout gap="sm">
              <Text>{t('mainPage.placeFirstName')}</Text>
              <Text>{t('mainPage.placeLastName')}</Text>
            </FlexColumnLayout>
          </Box>

          <Box>
            <FlexColumnLayout gap="sm">
              <Text>{t('mainPage.city')}</Text>
              <Text>27.04.2024</Text>
            </FlexColumnLayout>
          </Box>

          <Box>
            <Text>{t('mainPage.address')}</Text>
          </Box>
        </RowLayout>
      </FlexColumnLayout>
    </Root>
  );
};
