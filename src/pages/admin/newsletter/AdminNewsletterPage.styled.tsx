import styled from 'styled-components';
import { Button } from '../../../components/Button';
import { DropShadow, Radius } from '../../../styles/cards';
import { FontSize } from '../../../styles/font-size';
import { RedesignSpacings } from '../../../styles/spacings';
import { BorderColors, Colors, FontFamilies, TextColors } from '../../../styles/theme';

export const AdminNewsletterPageStyled = styled.div`
  width: 100%;
`;

export const SubscribersSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.md};
`;

export const SubscribersMeta = styled.div`
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};
  color: ${TextColors.secondary};
`;

export const SubscribersList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  border-radius: ${Radius.xl};
  background: ${Colors.white};
  box-shadow: ${DropShadow.card};
  overflow: hidden;
`;

export const SubscriberRow = styled.li`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${RedesignSpacings.xs};
  padding: ${RedesignSpacings.sm} ${RedesignSpacings.md};
  font-family: ${FontFamilies.primary};

  & + & {
    border-top: 1px solid ${BorderColors.subtleGreen};
  }
`;

export const SubscriberEmail = styled.span`
  font-size: ${FontSize.md};
  color: ${TextColors.primary};
  overflow-wrap: anywhere;
`;

export const SubscriberStatus = styled.span`
  font-size: ${FontSize.sm};
  color: ${TextColors.secondary};
`;

export const SubscriberStatusGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${RedesignSpacings.sm};
`;

export const SubscriberAction = styled(Button)`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  padding: ${RedesignSpacings.xxs} ${RedesignSpacings.xs};
  border: 1px solid ${BorderColors.subtleGreen};
  border-radius: ${Radius.lg};
  background: ${Colors.white};
  color: ${TextColors.secondary};
  font-family: ${FontFamilies.primary};
  font-size: ${FontSize.sm};

  &:focus-visible {
    outline: 2px solid ${TextColors.secondary};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: default;
    color: ${TextColors.secondary};
    opacity: 0.55;
  }
`;

export const SubscribersEmpty = styled.div`
  padding: ${RedesignSpacings.md};
  border-radius: ${Radius.xl};
  background: ${Colors.white};
  box-shadow: ${DropShadow.card};
  font-family: ${FontFamilies.primary};
`;
