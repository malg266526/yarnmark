import styled from 'styled-components';
import { PageContent } from '../../components/PageContent';
import { Spacings } from '../../styles/spacings';
import { ScreenSize } from '../../styles/screeen-size';
import { Colors } from '../../styles/theme';

export const StyledPageContent = styled(PageContent)``;

export const PlainInfo = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.white};
  padding: 0 ${Spacings.md} ${Spacings.md} ${Spacings.md};
  max-width: 50%;
  width: 50%;
  min-height: 100px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);

  @media (max-width: ${ScreenSize.tablet}) {
    max-width: 92%;
    width: 92%;
  }
`;

export const TitleWrapper = styled.div`
  width: 30%;

  @media (max-width: ${ScreenSize.tablet}) {
    width: 90%;
    margin-bottom: ${Spacings.md};
    text-align: center;
  }
`;

export const HallWrapper = styled.div`
  justify-content: space-between;
  display: flex;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  background-color: ${Colors.white};

  @media (max-width: ${ScreenSize.tablet}) {
    width: 90%;
    flex-direction: column;
    align-items: center;
    align-self: center;
  }

  @media (max-width: ${ScreenSize.phone}) {
    width: 96%;
  }
`;
