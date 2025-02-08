import { Picture } from '../../../../components/Picture';
import { Typography } from '../../../../components/Typography';
import React from 'react';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import styled from 'styled-components';
import { RedesignSpacings } from '../../../../styles/spacings';
import { BackgroundColors } from '../../../../styles/theme';
import { WorkshopsEntry } from '../workshopsConfig';
import { Ribbon } from './Ribbon';
import { Button, CtaButton } from '../../../../components/Button';
import { useToggle } from '../../../../hooks/useToggle';
import verticalRibbonIcon from '../../../../assets/figmaIcons/vertical_ribbon.svg';
import { Icon } from '../../../../components/Icon';
import backIcon from '../../../../assets/figmaIcons/back_arrow_icon.svg';
import closeIcon from '../../../../assets/figmaIcons/simple_close_icon.svg';
import { RowLayout } from '../../../../components/RowLayout';
import { CardLayout } from './CardLayout';
import { WorkshopPrice } from './WorkshopPrice';
import { FontSize } from '../../../../styles/font-size';

const MobileCardLayout = styled(CardLayout)<{ isExpanded?: boolean }>`
  flex-direction: ${({ isExpanded }) => (isExpanded ? 'column' : 'row')};
`;

const GoBackButtons = styled(RowLayout)`
  margin-bottom: -${RedesignSpacings.xs};
`;

const InfoSection = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

  justify-content: space-around;
  align-items: center;
  gap: ${RedesignSpacings.xs};
  text-align: center;
`;

const VerticalRibbonIcon = styled.div<{ src: string }>`
  background: url(${({ src }) => src}) no-repeat center;
  background-size: cover;

  height: 100%;

  transform: rotate(180deg);

  color: #fff;
  writing-mode: vertical-rl;
  text-orientation: mixed;

  text-align: center;
`;

const SmallCtaButton = styled(CtaButton)`
  font-size: ${FontSize.sm};
`;

const VerticalRibbonTextWrapper = styled.div`
  width: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface RibbonCardProps {
  workshop: WorkshopsEntry;
}

export const MobileRibbonCard = ({ workshop }: RibbonCardProps) => {
  const t = useTypedTranslation();
  const [isExpanded, toggle] = useToggle();

  return (
    <MobileCardLayout onClick={toggle} isExpanded={isExpanded}>
      {isExpanded && (
        <GoBackButtons wide justify="space-between">
          <Button onClick={close}>
            <Icon size="28px" zIndex={0} src={backIcon} />
          </Button>

          <Button onClick={close}>
            <Icon size="28px" zIndex={0} src={closeIcon} />
          </Button>
        </GoBackButtons>
      )}

      {isExpanded ? (
        <Ribbon color={BackgroundColors.mobileRibbon}>
          <Typography size="sm">{workshop.time}</Typography>
          <Typography size="sm">{t(`workshops.room.${workshop.room}`)}</Typography>
        </Ribbon>
      ) : (
        <VerticalRibbonIcon src={verticalRibbonIcon}>
          <VerticalRibbonTextWrapper>
            <Typography size="sm">{workshop.time}</Typography>
          </VerticalRibbonTextWrapper>
        </VerticalRibbonIcon>
      )}

      <Picture
        picture={{
          fallbackUrl: workshop.picture.fallback,
          sources: workshop.picture.sources
        }}
        alt={t(workshop.topicKey)}
        width={106}
        height={106}
        style={{ borderRadius: '50%', objectFit: 'cover' }}
      />

      <InfoSection>
        {isExpanded ? (
          <Typography size="sm">{workshop.description ? t(workshop.description) : 'Todo'}</Typography>
        ) : (
          <Typography size="sm">{t(workshop.topicKey)}</Typography>
        )}

        <WorkshopPrice workshop={workshop} />

        <SmallCtaButton
          onClick={() => window.open('https://wloczykijki.pl/pl/p/Bilet-wstepu-na-targi-/2832', '_blank')}
          aria-label="open workshops tickets">
          {t('workshops.buyTicket')}
        </SmallCtaButton>
      </InfoSection>
    </MobileCardLayout>
  );
};
