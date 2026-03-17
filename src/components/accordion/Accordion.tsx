import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { RedesignSpacings } from '../../styles/spacings';
import { Typography } from '../Typography';
import { BackgroundColors } from '../../styles/theme';

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const AccordionContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  background-color: ${BackgroundColors.green.light};
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin: 0 auto;
`;

const AccordionHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${RedesignSpacings.md} ${RedesignSpacings.lg};
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

const ChevronIcon = styled.svg<{ isOpen: boolean }>`
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  display: grid;
  grid-template-rows: ${({ isOpen }) => (isOpen ? '1fr' : '0fr')};
  transition: grid-template-rows 0.3s ease-in-out;
`;

const AccordionInner = styled.div`
  overflow: hidden;
`;

const AccordionBody = styled.div`
  padding: ${RedesignSpacings.sm} ${RedesignSpacings.lg} ${RedesignSpacings.lg};
  display: flow-root;
`;

export const Accordion = ({ title, children, defaultOpen = false }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <AccordionContainer>
      <AccordionHeader onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        <Typography size="lg" weight="bold">
          {title}
        </Typography>
        <ChevronIcon isOpen={isOpen} viewBox="0 0 24 24">
          <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </ChevronIcon>
      </AccordionHeader>

      <AccordionContent isOpen={isOpen}>
        <AccordionInner>
          <AccordionBody>{children}</AccordionBody>
        </AccordionInner>
      </AccordionContent>
    </AccordionContainer>
  );
};
