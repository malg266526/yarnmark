import styled from 'styled-components';
import { PageContent } from '../components/PageContent';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Spacings } from '../styles/spacings';
import { ScreenSize } from '../styles/screeen-size';

export const StyledPageContent = styled(PageContent)`
  /*   ${LanguageSwitcher} {
    position: absolute;
    z-index: 1;
    top: 0;
    right: ${Spacings.md};

    @media (max-width: ${ScreenSize.phone}) {
      top: initial;
      bottom: 0;
    }
  } */
`;
