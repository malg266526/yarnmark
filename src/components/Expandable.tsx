import React, { ReactNode } from "react";
import { FlexColumnLayout } from "./FlexColumnLayout";
import { useToggle } from "../hooks/useToggle";
import { RowLayout } from "./RowLayout";
import styled from "styled-components";
import { Button } from "./Button";
import { Icon } from "./Icon";
import chevronDownIcon from "../assets/figmaIcons/chevron_down-icon.svg";

const ChevronIcon = styled(Icon)`
  transition: all 0.2s linear;

  &.active {
    transform: rotate(180deg);
  }
`;

interface Props {
  title: ReactNode;
  children: ReactNode;
}

export const Expandable = ({ title, children }: Props) => {
  const [isExpanded, toggle] = useToggle();

  return (
    <FlexColumnLayout padding="none" width="100%">
      <RowLayout>
        {title}
        <Button onClick={toggle}>
          <ChevronIcon
            size="18px"
            zIndex={0}
            src={chevronDownIcon}
            className={isExpanded ? `active` : ""}
          />
        </Button>
      </RowLayout>
      {isExpanded && children}
    </FlexColumnLayout>
  );
};
