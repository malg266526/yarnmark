import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { RedesignSpacings } from '../styles/spacings';
import { BackgroundColors } from '../styles/theme';

const GhostButtonLayout = styled(Button)`
  display: flex;
  height: 52px;
  padding: 0 16px;

  justify-content: center;
  align-items: center;
  gap: ${RedesignSpacings.xs};

  border-radius: 18px;
  border: 0.5px solid ${BackgroundColors.greenStrong};

  color: ${BackgroundColors.greenStrong};
`;

interface GhostButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const GhostButton = ({ children, onClick }: GhostButtonProps) => (
  <GhostButtonLayout onClick={onClick}>{children}</GhostButtonLayout>
);
