import { StandProps } from './StandProps';
import { getSizeForOrientation } from './utils/getSizeForOrientation';
import { DefaultStand, DefaultTypeColorMap, useEditor } from './EditorContext';

export const useStandForm = (onSubmit: (stand: StandProps) => void) => {
  const { currentStand, setCurrentStand } = useEditor();

  const handleTypeChange = (type: StandProps['type']) => {
    const size = getSizeForOrientation(type, currentStand.isHorizontal);
    const defaultColor = DefaultTypeColorMap[type];

    setCurrentStand({ ...currentStand, type, width: size.width, height: size.height, color: defaultColor });
  };

  const handleOrientationChange = (isHorizontal: boolean) => {
    const size = getSizeForOrientation(currentStand.type, isHorizontal);
    setCurrentStand({ ...currentStand, isHorizontal, width: size.width, height: size.height });
  };

  const updateField = <K extends keyof StandProps>(field: K, value: StandProps[K]) => {
    setCurrentStand({ ...currentStand, [field]: value });
  };

  const reset = () => setCurrentStand(DefaultStand);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStand.index || !currentStand.type) return;

    console.log('Submitting stand:', currentStand);

    onSubmit(currentStand);
    reset();
  };

  return {
    stand: currentStand,
    setStand: setCurrentStand,
    handleTypeChange,
    handleOrientationChange,
    updateField,
    submit,
    reset,
    isValid: !!currentStand.index && !!currentStand.type
  };
};
