import React from "react";
import styled from "styled-components";
import { FlexColumnLayout } from "./FlexColumnLayout";
import { ScreenSize } from "../styles/screeen-size";
import { RedesignSpacings } from "../styles/spacings";

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

const ulSeparator = "<ul>";

interface Props {
  text?: string;
}

export const TextToListFormatter = ({ text }: Props) => {
  if (!text) return "";

  const parts = text.split(ulSeparator);
  const before = parts[0];

  const paragraphs = before.split("<br>").filter(Boolean);

  const list = !text.includes(ulSeparator)
    ? []
    : parts[1]
        .replaceAll(ulSeparator, "")
        .replaceAll("</ul>", "")
        .replaceAll("</li>", "")
        .split("<li>")
        .filter(Boolean);

  return (
    <Scrollable>
      {before && (
        <FlexColumnLayout padding="none" align="flex-start" gap="xs">
          {paragraphs.map((line, index) => (
            <p key={`${index}_line`}>{line}</p>
          ))}
        </FlexColumnLayout>
      )}
      <WorkshopUl>
        {list.map((item, index) => (
          <li key={`${index}_li`}>{item}</li>
        ))}
      </WorkshopUl>
    </Scrollable>
  );
};
