import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import { Link } from './Link';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const StyledLink = styled(Link)`
  margin-left: 12px;
`;

export const Menu = () => {
  return (
    <Root>
      <Link anchorProps={{ href: 'https://google.com', target: '_blank', rel: 'noreferrer' }}>Warsztaty</Link>

      <StyledLink anchorProps={{ href: 'https://google.com', target: '_blank', rel: 'noreferrer' }}>
        Wystawcy
      </StyledLink>

      <StyledLink anchorProps={{ href: 'https://google.com', target: '_blank', rel: 'noreferrer' }}>
        Organizatorzy
      </StyledLink>

      <StyledLink anchorProps={{ href: 'https://google.com', target: '_blank', rel: 'noreferrer' }}>Kontakt</StyledLink>

      <StyledLink anchorProps={{ href: 'https://www.instagram.com/dziergamynapolu/', className: 'instagram social' }}>
        <FontAwesomeIcon icon={faInstagram} size="lg" />
      </StyledLink>
    </Root>
  );
};
