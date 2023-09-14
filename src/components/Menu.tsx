import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import { Link } from './Link';

const Root = styled.div`
  display: inline-flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;
`;

export interface MenuProps {
  children?: ReactNode;
}

export const Menu = ({ children }: MenuProps) => {
  return (
    <Root>
      {children}

      <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
        <FontAwesomeIcon icon={faInstagram} size="lg" />
      </Link>
    </Root>
  );
};
