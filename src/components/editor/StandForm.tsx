import React, { useState } from "react";
import styled from "styled-components";
import { StandInfoType } from "./StandInfoType";
import { getSizeForOrientation, StandSizes } from "./getSizeForOrientation";
import { Button, CtaButton } from "../Button";
import { useEditor } from "./EditorContext";
import { useStandForm } from "./useStandForm";

// Extra styled container for layout and background
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 24px 16px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
`;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const Label = styled.label`
  min-width: 110px;
  font-weight: bold;
  text-align: left;
`;

const Input = styled.input`
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #bbb;
  border-radius: 4px;
  font-size: 1rem;
`;

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StandTypes: Array<"premium" | "mini" | "standard" | "other"> = [
  "premium",
  "mini",
  "standard",
  "other"
];

const DefaultStand: StandInfoType = {
  index: "",
  type: "standard",
  isHorizontal: false,
  width: StandSizes["standard"].width,
  height: StandSizes["standard"].height
};

export const StandForm = () => {
  const { addStand } = useEditor();

  const { stand, handleTypeChange, handleOrientationChange, updateField, submit, isValid } =
    useStandForm(addStand);

  return (
    <Container>
      <Form onSubmit={submit}>
        <FieldRow>
          <Label htmlFor="stand-index">Stand Index:</Label>
          <Input
            id="stand-index"
            type="text"
            value={stand.index}
            required
            onChange={(e) => updateField('index', e.target.value)}
          />
        </FieldRow>
        <FieldRow>
          <Label htmlFor="stand-vendor">Vendor:</Label>
          <Input
            id="stand-vendor"
            type="text"
            value={stand.vendor || ""}
            onChange={(e) => updateField('vendor', e.target.value)}
          />
        </FieldRow>
        <FieldRow>
          <Label>Type:</Label>
          <div style={{ display: "flex", gap: 16 }}>
            {StandTypes.map(type => (
              <label key={type} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <input
                  type="radio"
                  name="stand-type"
                  value={type}
                  required
                  checked={stand.type === type}
                  onChange={() => handleTypeChange(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </FieldRow>
        <FieldRow>
          <Label htmlFor="stand-horizontal">Horizontal:</Label>
          <input
            id="stand-horizontal"
            type="checkbox"
            checked={!!stand.isHorizontal}
            onChange={(e) => handleOrientationChange(e.target.checked)}
          />
        </FieldRow>

        <FieldRow>
          <Label htmlFor="stand-width">Width:</Label>
          <Input
            id="stand-width"
            type="number"
            min={0}
            value={stand.width ?? ""}
            onChange={(e) =>
              updateField(
                "width",
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
          />
        </FieldRow>

        <FieldRow>
          <Label htmlFor="stand-height">Height:</Label>
          <Input
            id="stand-height"
            type="number"
            min={0}
            value={stand.height ?? ""}
            onChange={(e) =>
              updateField(
                "height",
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
          />
        </FieldRow>
        <ButtonRow>
          <CtaButton type="submit" disabled={!isValid}>
            Add Stand
          </CtaButton>
        </ButtonRow>
      </Form>
    </Container>
  );
};

export default StandForm;
