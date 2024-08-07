import React, { forwardRef, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { RedesignSpacings } from '../styles/spacings';
import { DropShadow, Radius } from '../styles/cards';
import { RoundBorderIcon } from './RoundBorderIcon';

export interface ImageButtonProps {
  icon: React.ReactNode;
  children?: React.ReactNode;
  photo?: string;
  text?: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

const activeCss = css`
  border: 1px solid black;
  box-shadow: 1px 1px 5px 1px #555;
`;

const ImageButtonLayout = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${RedesignSpacings.xs};
  padding-right: ${RedesignSpacings.md};
  border: 1px solid transparent;
  border-radius: ${Radius.lg};
  box-shadow: ${DropShadow.md};
  cursor: pointer;
  word-break: break-word;

  transition: all 300ms cubic-bezier(0.72, 2.04, 0.68, 0.87);

  &:hover {
    ${activeCss};
  }

  ${({ active }) => active && activeCss};
`;

export const ImageButton = forwardRef<HTMLDivElement, ImageButtonProps>(
  ({ icon, children, ...rest }: ImageButtonProps, ref) => (
    <ImageButtonLayout ref={ref} {...rest}>
      <RoundBorderIcon>{icon}</RoundBorderIcon>
      {children}
    </ImageButtonLayout>
  )
);

ImageButton.displayName = 'ImageButton';
