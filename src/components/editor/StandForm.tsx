import React from "react";
import styled from "styled-components";
import { StandInfoType } from "./StandInfoType";

const Form = styled.form`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  margin-right: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 4px;
  min-width: 60px;
  border: 1px solid #bbb;
  border-radius: 4px;
`;

interface StandFormProps {
  stands: StandInfoType[];
  onChange: (stands: StandInfoType[]) => void;
}

export const StandForm: React.FC<StandFormProps> = ({ stands, onChange }) => {
  // For now, edit the first stand in the array
  const stand = stands[0] || { index: "" };

  const handleChange = (field: keyof StandInfoType, value: string) => {
    const updated = { ...stand, [field]: value };
    onChange([updated, ...stands.slice(1)]);
  };

  return (
    <Form>
      <div>
        <Label htmlFor="stand-index">Stand Index:</Label>
        <Input
          id="stand-index"
          type="text"
          value={stand.index}
          onChange={e => handleChange("index", e.target.value)}
        />
      </div>
      {/* Add more fields as needed, e.g. name, description */}
      <div>
        <Label htmlFor="stand-name">Name:</Label>
        <Input
          id="stand-name"
          type="text"
          value={stand.name || ""}
          onChange={e => handleChange("name", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="stand-description">Description:</Label>
        <Input
          id="stand-description"
          type="text"
          value={stand.description || ""}
          onChange={e => handleChange("description", e.target.value)}
        />
      </div>
    </Form>
  );
};
