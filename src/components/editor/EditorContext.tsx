import React, { createContext, useContext, useState, ReactNode } from "react";
import { StandColorsMap, StandProps, StandType } from "./StandProps";
import { StandSizes } from "./utils/getSizeForOrientation";

interface EditorContextType {
  stands: StandProps[];
  addStand: (stand: StandProps) => void;
  currentStand: StandProps;
  setCurrentStand: (stand: StandProps) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const DefaultTypeColorMap: Record<StandType, keyof typeof StandColorsMap> = {
  premium: "premium",
  standard: "normal1",
  mini: "small1",
  other: "taken",
};

export const DefaultStand: StandProps = {
  index: "",
  type: "standard",
  isHorizontal: false,
  width: StandSizes.standard.width,
  height: StandSizes.standard.height,
  color: DefaultTypeColorMap["standard"],
};


interface EditorProviderProps {
  children: ReactNode
}

export const EditorProvider = ({ children }: EditorProviderProps) => {
  const [stands, setStands] = useState<StandProps[]>([]);
  const [currentStand, setCurrentStand] = useState<StandProps>(DefaultStand);

  const addStand = (stand: StandProps) => {
    setStands(prev => [...prev, stand]);
  };

  return (
    <EditorContext.Provider value={{ stands, addStand, currentStand, setCurrentStand }}>
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
