import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useEditor } from './EditorContext';
import type { StandProps } from './StandProps';
import { RedesignSpacings } from '../../styles/spacings';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { getStandAreaM2, groupStandsByType } from './utils/standListUtils';

const LIST_MAX_HEIGHT_PX = 420;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xs};
  width: 100%;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #bbb;
  border-radius: 8px;
  font-size: 0.9rem;
`;

const ScrollArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.xs};
  max-height: ${LIST_MAX_HEIGHT_PX}px;
  overflow-y: auto;
`;

const TypeGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const GroupHeading = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #6b7280;
  padding-top: ${RedesignSpacings.xs};
`;

const EmptyMessage = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const StandItem = styled.div<{ selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${({ selected }) => (selected ? '#dc2626' : '#e5e7eb')};
  background-color: ${({ selected }) => (selected ? '#fef2f2' : '#fff')};
  cursor: pointer;
  gap: ${RedesignSpacings.sm};

  &:hover {
    background-color: ${({ selected }) => (selected ? '#fee2e2' : '#f9fafb')};
  }

  transition:
    background-color 0.2s,
    border-color 0.2s;
`;

const StandSummary = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

const Index = styled.span`
  font-weight: 600;
  color: #111827;
`;

const Area = styled.span`
  font-size: 0.8rem;
  color: #4b5563;
  white-space: nowrap;
`;

const Vendor = styled.span`
  font-size: 0.8rem;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  flex: 0 0 auto;

  &:hover {
    background-color: #dc2626;
  }
`;

interface StandListProps {
  onRemoveStand: (stand: StandProps) => void;
}

export const StandList = ({ onRemoveStand }: StandListProps) => {
  const t = useTypedTranslation();
  const { stands, setCurrentStand, currentStand } = useEditor();
  const [searchQuery, setSearchQuery] = useState('');

  const standGroups = useMemo(() => groupStandsByType(stands, searchQuery), [stands, searchQuery]);

  if (stands.length === 0) {
    return <EmptyMessage>{t('editorPage.standList.noStands')}</EmptyMessage>;
  }

  return (
    <ListContainer>
      <SearchInput
        type="search"
        value={searchQuery}
        aria-label={t('editorPage.standList.searchLabel')}
        placeholder={t('editorPage.standList.searchPlaceholder')}
        onChange={(event) => setSearchQuery(event.target.value)}
      />

      {standGroups.length === 0 ? (
        <EmptyMessage>{t('editorPage.standList.noResults')}</EmptyMessage>
      ) : (
        <ScrollArea>
          {standGroups.map((group) => (
            <TypeGroup key={group.type}>
              <GroupHeading>
                {t('editorPage.standList.groupHeading', {
                  type: t(`editorPage.standForm.types.${group.type}` as const),
                  count: group.stands.length
                })}
              </GroupHeading>

              {group.stands.map((stand) => (
                <StandItem
                  key={stand.id}
                  selected={stand.id === currentStand.id}
                  onClick={() => setCurrentStand(stand)}
                >
                  <StandSummary>
                    <Index>{stand.index}</Index>
                    <Area>{t('editorPage.standList.area', { value: getStandAreaM2(stand) })}</Area>
                    <Vendor>{stand.vendor || t('editorPage.standList.noVendor')}</Vendor>
                  </StandSummary>

                  <RemoveButton
                    onClick={(event) => {
                      event.stopPropagation();
                      onRemoveStand(stand);
                    }}
                  >
                    {t('editorPage.standList.remove')}
                  </RemoveButton>
                </StandItem>
              ))}
            </TypeGroup>
          ))}
        </ScrollArea>
      )}
    </ListContainer>
  );
};
