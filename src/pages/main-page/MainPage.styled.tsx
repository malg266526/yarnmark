import styled from 'styled-components';
import { Spacings } from '../../styles/spacings';
import { ScreenSize } from '../../styles/screeen-size';
import { Carouselge } from '../../components/Carouselge';
import { PageContent } from '../../components/PageContent';
import { FontSize } from '../../styles/font-size';

export const StyledPageContent = styled(PageContent)`
  ${Carouselge} {
    width: 550px;

    @media (max-width: ${ScreenSize.tablet}) {
      width: 100%;
    }
  }
`;

export const InvitationCardWrapper = styled.div`
  padding-left: 240px;
`;

export const SecondaryButton = styled.button`
  cursor: pointer;
  font-size: ${FontSize.lg};
  font-weight: 600;
  text-decoration: underline;
  margin-top: ${Spacings.sm};
  background-color: transparent;
  border: none;
`;

export const LinkWrapper = styled.div`
  margin-left: -8px;
`;
