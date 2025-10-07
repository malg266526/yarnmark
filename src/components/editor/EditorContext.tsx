import React, { createContext, useContext, useState, ReactNode } from "react";
import { StandProps } from "./StandProps";

interface EditorContextType {
  stands: StandProps[];
  addStand: (stand: StandProps) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

interface EditorProviderProps {
  children: ReactNode
}

export const EditorProvider = ({ children }: EditorProviderProps) => {
  const [stands, setStands] = useState<StandProps[]>([]);

  const addStand = (stand: StandProps) => {
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
