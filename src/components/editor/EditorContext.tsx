import React, { createContext, useContext, ReactNode, useState } from 'react';
import { StandColorsMap, StandProps, StandType } from './StandProps';
import { StandSizes } from './utils/getSizeForOrientation';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { generateId } from './utils/generateId';

interface EditorContextType {
  stands: StandProps[];
  addStand: (stand: StandProps) => void;
  currentStand: StandProps;
  setCurrentStand: (stand: StandProps) => void;
  removeStand: (stand: StandProps) => void;
  updateStand: (stand: StandProps) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const DefaultTypeColorMap: Record<StandType, keyof typeof StandColorsMap> = {
  premium: 'premium',
  standard: 'normal1',
  mini: 'small1',
  other: 'taken'
};

export const DefaultStand: StandProps = {
  id: 'default_00',
  index: '',
  type: 'standard',
  isHorizontal: false,
  width: StandSizes.standard.width,
  height: StandSizes.standard.height,
  color: DefaultTypeColorMap['standard']
};

interface EditorProviderProps {
  children: ReactNode;
}

export const EditorProvider = ({ children }: EditorProviderProps) => {
  const [stands, setStands] = useLocalStorage<StandProps[]>('stands', []);
  const [currentStand, setCurrentStand] = useState<StandProps>(DefaultStand);

  const addStand = (stand: StandProps) => {
    const newStand = { ...stand, id: generateId() };

    setStands([...stands, newStand]);
  };

  console.log('currentStand', currentStand);

  const removeStand = (standToRemove: StandProps) => {
    setStands(stands.filter((stand) => stand.id !== standToRemove.id));
  };

  const updateStand = (updatedStand: StandProps) => {
    console.log('updateStand', updatedStand);
    console.log('currentStand', currentStand);

    setStands(stands.map((stand) => (stand.id === updatedStand.id ? updatedStand : stand)));
  };

  return (
    <EditorContext.Provider value={{ stands, addStand, currentStand, setCurrentStand, removeStand, updateStand }}>
      {children}
    </EditorContext.Provider>
  );
};

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}
