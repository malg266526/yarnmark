import styled, { css } from 'styled-components';
import { Spacings } from '../styles/spacings';

const Tab = styled.div<{ active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${Spacings.md};
  padding: ${Spacings.sm};
  cursor: pointer;

  border-top: 2px solid transparent;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  &:hover {
    border-color: black;
  }

  ${({ active }) =>
    active &&
    css`
      border-color: black;
      background: white;
    `};
`;

const Content = styled.div`
  background: white;
  border-radius: 4px;
  padding: ${Spacings.md};
  width: 100%;
  flex: 1 1 auto;

  box-shadow: 1px 14px 7px -11px #555;
`;

export const Tabs = Object.assign(
  styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 2px;
  `,
  {
    Tab,
    Content
  }
);
