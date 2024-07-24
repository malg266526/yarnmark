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

export const MobilePicture = styled.picture`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: cover;
  object-position: top;
  z-index: 0;

  > img {
    max-height: 100%;
    max-width: 100%;
    object-fit: cover;
    object-position: top;
  }
`;

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 1;
`;

export const ImageContentLayout = styled.div`
  max-width: 700px;
  display: flex;
  flex-direction: row-reverse;
  gap: ${Spacings.md};

  @media (max-width: ${ScreenSize.phone}) {
    flex-direction: column-reverse;
    flex-wrap: wrap;
    max-width: 100%;
    align-items: center;
    gap: ${Spacings.md};
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 1;
  min-width: 250px;

  @media (max-width: ${ScreenSize.phone}) {
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: ${Spacings.md};

    > * {
      flex: 1 1 auto;
    }
  }
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
