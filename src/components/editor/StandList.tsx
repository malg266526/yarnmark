import styled from 'styled-components';
import { useEditor } from './EditorContext';
import React from 'react';
import { RedesignSpacings } from '../../styles/spacings';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xs};
`;

const StandItem = styled.div<{ selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid ${({ selected }) => (selected ? '#3b82f6' : '#e5e7eb')};
  background-color: ${({ selected }) => (selected ? '#eff6ff' : '#fff')};
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;
  gap: ${RedesignSpacings.sm};

  &:hover {
    background-color: ${({ selected }) => (selected ? '#dbeafe' : '#f9fafb')};
  }
`;

const StandInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const Index = styled.span`
  font-weight: 600;
  color: #4b5563;
`;

const RemoveButton = styled.button`
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #dc2626;
  }
`;

export const StandList = () => {
  const { stands, removeStand, setCurrentStand, currentStand } = useEditor();

  return (
    <ListContainer>
      {stands.map((stand) => {
        return (
          <StandItem key={stand.id} selected={stand.id === currentStand.id} onClick={() => setCurrentStand(stand)}>
            <StandInfo>
              <Index>{stand.index}</Index>
            </StandInfo>

            <RemoveButton
              onClick={(e) => {
                e.stopPropagation();
                removeStand(stand);
              }}>
              Remove
            </RemoveButton>
          </StandItem>
        );
      })}
    </ListContainer>
  );
};
