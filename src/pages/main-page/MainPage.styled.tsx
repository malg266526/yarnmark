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

export const SecondaryButton = styled.button`
  cursor: pointer;
  font-size: ${FontSize.lg};
  font-weight: 600;
  text-decoration: underline;
  margin-top: ${Spacings.sm};
  background-color: transparent;
  border: none;
`;

export const TextWrapper = styled.div`
  @media (max-width: ${ScreenSize.phone}) {
    flex-wrap: wrap;
  }
`;

export const LinkWrapper = styled.div`
  margin-left: -8px;
`;

export const ImageWrapperColumn = styled(TextWrapper)`
  max-width: 50%;
  padding-top: ${Spacings.md};

  @media (max-width: ${ScreenSize.phone}) {
    max-width: 100%;
  }
`;
