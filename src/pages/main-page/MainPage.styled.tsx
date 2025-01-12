import styled from 'styled-components';
import { ScreenSize } from '../../styles/screeen-size';
import { Carouselge } from '../../components/carousels/Carouselge';
import { PageContent } from '../../components/PageContent';

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

export const LinkWrapper = styled.div`
  margin-left: -8px;
`;
