import React from "react";
import { Button } from "../Button";

export const Actions: React.FC = () => (
  <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
    <Button type="button">Save</Button>
    <Button type="button">Edit</Button>
  </div>
);
