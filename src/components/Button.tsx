import React, { ReactNode } from 'react';
import { Colors } from '../styles/theme';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${Colors.honeyMustard};
  color: white;
  font-size: 20px;
  padding: 10px 40px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  font-weight: 400;
`;

export interface ButtonProps {
  children?: ReactNode;
}

export const Button = ({ children }: ButtonProps) => <StyledButton>{children}</StyledButton>;
