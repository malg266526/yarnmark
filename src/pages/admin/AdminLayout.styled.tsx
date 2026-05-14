import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { BorderColors, BrownScale, GrayScale, TextColors } from '../../styles/theme';
import { ScreenSize } from '../../styles/screeen-size';

export const AdminRoot = styled.div`
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: stretch;
`;

export const AdminShell = styled.div`
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  min-height: 100vh;

  @media (max-width: ${ScreenSize.phone}) {
    grid-template-columns: 1fr;
  }
`;

export const AdminSidebar = styled.aside`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  align-self: start;
  min-height: 100vh;
  padding: ${RedesignSpacings.lg} ${RedesignSpacings.md};
  background: linear-gradient(180deg, ${GrayScale[100]} 0%, ${GrayScale[50]} 100%);
  border-right: 1px solid ${BorderColors.subtleGreen};
  gap: ${RedesignSpacings.lg};

  @media (max-width: ${ScreenSize.phone}) {
    position: static;
    min-height: auto;
    padding: ${RedesignSpacings.sm};
    border-right: none;
    border-bottom: 1px solid ${BorderColors.subtleGreen};
  }
`;

export const AdminBrand = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xxs};
`;

export const AdminKicker = styled.span`
  color: ${TextColors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const AdminNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xs};
`;

export const AdminNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: ${RedesignSpacings.xs} ${RedesignSpacings.sm};
  border-radius: 10px;
  border: 1px solid transparent;
  color: ${BrownScale[900]};
  text-decoration: none;
  transition:
    background-color 120ms ease-in-out,
    border-color 120ms ease-in-out,
    color 120ms ease-in-out;

  &:hover {
    background: ${GrayScale[50]};
    border-color: ${BorderColors.subtleGreen};
    color: ${TextColors.secondary};
  }

  &.active {
    background: ${TextColors.secondary};
    border-color: ${TextColors.secondary};
    color: ${GrayScale[50]};
  }
`;

export const AdminMain = styled.main`
  min-width: 0;
  padding: ${RedesignSpacings.lg};

  @media (max-width: ${ScreenSize.phone}) {
    padding: ${RedesignSpacings.sm};
  }
`;
