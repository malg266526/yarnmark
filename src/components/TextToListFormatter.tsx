import React from 'react';
import styled from 'styled-components';
import { FlexColumnLayout } from './FlexColumnLayout';
import { ScreenSize } from '../styles/screeen-size';
import { RedesignSpacings } from '../styles/spacings';
import { Trans } from 'react-i18next';

const WorkshopUl = styled.ul`
  margin: 0;
  padding: ${RedesignSpacings.sm};
  padding-bottom: 0;
`;

const Scrollable = styled.div`
  overflow-y: auto;
  max-height: 300px;
  padding-left: ${RedesignSpacings.sm};

  @media (max-width: ${ScreenSize.phone}) {
    max-height: unset;
    overflow-y: visible;
    padding-left: 0;
  }
`;

const ulStartSeparator = '<ul>';
const ulEndSeparator = '</ul>';

interface Props {
  text?: string;
}

export const TextToListFormatter = ({ text }: Props) => {
  if (!text) return null;

  const ulStartIndex = text.indexOf(ulStartSeparator);
  const ulEndIndex = text.indexOf(ulEndSeparator);

  // Case 1: No <ul> tag
  if (ulStartIndex === -1) {
    const paragraphs = text.split('<br>').filter(Boolean);
    return (
      <Scrollable>
        <FlexColumnLayout padding="none" align="flex-start" gap="xs">
          {paragraphs.map((line, index) => (
            <p key={`${index}_line`}>
              <Trans>{line}</Trans>
            </p>
          ))}
        </FlexColumnLayout>
      </Scrollable>
    );
  }

  // Case 2: <ul> tag exists
  const beforeText = text.substring(0, ulStartIndex);
  const listContent = text.substring(ulStartIndex + ulStartSeparator.length, ulEndIndex);
  const afterText = text.substring(ulEndIndex + ulEndSeparator.length);

  const beforeParagraphs = beforeText.split('<br>').filter(Boolean);
  const afterParagraphs = afterText.split('<br>').filter(Boolean);

  const listItems = listContent.replaceAll('</li>', '').split('<li>').filter(Boolean);

  return (
    <Scrollable>
      {/* Render text before the list */}
      {beforeParagraphs.length > 0 && (
        <FlexColumnLayout padding="none" align="flex-start" gap="xs">
          {beforeParagraphs.map((line, index) => (
            <p key={`before_${index}_line`}>
              <Trans>{line}</Trans>
            </p>
          ))}
        </FlexColumnLayout>
      )}

      {/* Render the list */}
      <WorkshopUl>
        {listItems.map((item, index) => (
          <li key={`${index}_li`}>
            <Trans>{item}</Trans>
          </li>
        ))}
      </WorkshopUl>

      {/* Render text after the list */}
      {afterParagraphs.length > 0 && (
        <FlexColumnLayout padding="none" align="flex-start" gap="xs" style={{ paddingTop: RedesignSpacings.sm }}>
          {afterParagraphs.map((line, index) => (
            <p key={`after_${index}_line`}>
              <Trans>{line}</Trans>
            </p>
          ))}
        </FlexColumnLayout>
      )}
    </Scrollable>
  );
};
