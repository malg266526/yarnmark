import React from 'react';
import styled from "styled-components"
import { Colors } from '../styles/theme';

const Entry = styled.div`
  padding: 4px 8px;
  color: ${Colors.white};
  font-size: 1.6rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  background: transparent;
  transition: all 150ms ease-in-out;

  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Root = styled.div`
  background: ${Colors.ruinedSmores};
  padding: 12px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const SideBar = Object.assign(Root, {
  Entry
});
