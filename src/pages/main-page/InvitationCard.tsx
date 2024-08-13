import { SlantedCornersBox } from '../../components/SlantedCornersBox';
import { Picture } from '../../components/Picture';
import React from 'react';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { Typography } from '../../components/Typography';
import { FlexColumnLayout } from '../../components/FlexColumnLayout';
import styled from 'styled-components';
import { RedesignSpacings, Spacings } from '../../styles/spacings';
import { RowLayout } from '../../components/RowLayout';
import { BackgroundColors, GrayScale } from '../../styles/theme';
import { ScreenSize } from '../../styles/screeen-size';
import { Radius } from '../../styles/cards';
import { Band } from '../../components/bands/Band';
import { yarnmarkLogoPictureConfig } from '../../assets/yarnmarkLogoPictureConfig';

const Content = styled(FlexColumnLayout)`
  padding: ${Spacings.lg} ${Spacings.xs} 0 ${Spacings.xs};
  background-color: ${BackgroundColors.desktopCard};

  @media (max-width: ${ScreenSize.phone}) {
    background-color: ${GrayScale[200]};
    border-radius: ${Radius.xl};
  }
`;

const MiddleSection = styled(FlexColumnLayout)`
  padding: ${RedesignSpacings.xl} ${RedesignSpacings.md} ${RedesignSpacings.md} ${RedesignSpacings.md};
`;

const SignatureSection = styled(FlexColumnLayout)`
  margin-bottom: ${Spacings.lg};
  padding-left: ${RedesignSpacings.md};
`;

const BottomSection = styled(RowLayout)`
  width: 100%;
  align-items: flex-end;
  margin-top: -${Spacings.md};
`;

export const InvitationCard = () => {
  const t = useTypedTranslation();

  return (
    <SlantedCornersBox overflowSize="10px" width="400px" padding="none">
      <Content gap="none">
        <Band.Title>Krakoski Yarnmark Wełny</Band.Title>

        <MiddleSection gap="md">
          <Typography size="sm">{t('welcomeBand.invitation')}</Typography>

          <FlexColumnLayout gap="xs" padding="none">
            <Typography size="sm" weight="bold">
              {t('welcomeBand.when')}
            </Typography>
            <Typography size="sm" weight="bold">
              {t('welcomeBand.where')}
            </Typography>
            <Typography size="sm" weight="bold">
              Kraków
            </Typography>
          </FlexColumnLayout>

          <Typography size="sm">{t('welcomeBand.haveFun')}</Typography>
        </MiddleSection>

        <BottomSection justify="space-between" gap="none">
          <SignatureSection align="flex-start" gap="sm" padding="none">
            <Typography size="sm">{t('welcomeBand.seeYou')}</Typography>
            <Typography size="sm">
              DziergamyNaPolu <br /> & Włóczykijki
            </Typography>
          </SignatureSection>

          <Picture picture={yarnmarkLogoPictureConfig} alt="yarnmark_logo" width={156} height={212} />
        </BottomSection>
      </Content>
    </SlantedCornersBox>
  );
};
