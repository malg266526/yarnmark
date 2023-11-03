import styled from "styled-components"
import { Colors } from '../styles/theme';

const LinkEntry = styled.a`
  text-decoration: none;
  padding: 4px 8px;
  color: ${Colors.white};
  font-size: 1.6rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 150ms ease-in-out;
  background: rgba(0, 0, 0, 0);

  &:hover {
    cursor: pointer;
    background: linear-gradient(90deg, rgba(44,82,155,1) 0%, rgba(255,255,255, 0) 80%); 
  }
`;

const Root = styled.div`
  background: ${Colors.ruinedSmores};
  padding: 12px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const SideBar = Object.assign(Root, {
  LinkEntry
});
