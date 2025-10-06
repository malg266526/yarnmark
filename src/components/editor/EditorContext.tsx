import React, { createContext, useContext, useState, ReactNode } from "react";
import { StandInfoType } from "./StandInfoType";

interface EditorContextType {
  stands: StandInfoType[];
  addStand: (stand: StandInfoType) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

interface EditorProviderProps {
  children: ReactNode
}

export const EditorProvider = ({ children }: EditorProviderProps) => {
  const [stands, setStands] = useState<StandInfoType[]>([]);

  const addStand = (stand: StandInfoType) => {
    setStands(prev => [...prev, stand]);
  };

  return (
    <EditorContext.Provider value={{ stands, addStand }}>
      {children}
    </EditorContext.Provider>
  );
};

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
}
