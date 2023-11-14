import React from 'react';
import { Button } from '../components/Button';
import { FlexColumnLayout } from '../components/FlexColumnLayout';
import { LinkButton, RowLayout, StyledH1, StyledH2, Root, Box, Text } from './MainPage.styled';
import { useTypedTranslation } from '../translations/useTypedTranslation';

export const MainPage = () => {
  const t = useTypedTranslation();

  return (
    <Root>
      <FlexColumnLayout isFullHeight justifyContent="space-between">
        <FlexColumnLayout gap="sm">
          <StyledH2>{t('mainPage.firstTime')} </StyledH2>
          <StyledH1>Krakoski Yarnmark Wełny</StyledH1>
          <LinkButton href="https://google.com" target="_blank" rel="noreferrer">
            <Button> Kup Bilet </Button>
          </LinkButton>
        </FlexColumnLayout>

        <RowLayout>
          <Box>
            <FlexColumnLayout gap="sm">
              <Text>Hala 100-lecia KS Cracovia</Text>
              <Text> Centrum Sportu Niepełnosprawnych</Text>
            </FlexColumnLayout>
          </Box>

          <Box>
            <FlexColumnLayout gap="sm">
              <Text>Kraków</Text>
              <Text>27.04.2024</Text>
            </FlexColumnLayout>
          </Box>

          <Box>
            <Text>Aleja Marszałka Ferdynanda Focha 40</Text>
          </Box>
        </RowLayout>
      </FlexColumnLayout>
    </Root>
  );
};
