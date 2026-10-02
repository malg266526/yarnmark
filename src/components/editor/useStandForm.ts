import { StandProps } from './StandProps';
import { getSizeForOrientation } from './utils/getSizeForOrientation';
import { getSuggestedStandColor } from './utils/standColorUtils';
import { resizeStand, resizeStandToDeclaredSize } from './utils/standGeometryUtils';
import { isExistingStand } from './utils/standSelectionUtils';
import { DefaultStand, DefaultTypeColorMap, useEditor } from './EditorContext';

const SIZE_FIELDS: ReadonlyArray<keyof StandProps> = ['width', 'height'];

export const useStandForm = (onAddStand: (stand: StandProps) => void) => {
  const { currentStand, setCurrentStand, stands, updateStand } = useEditor();
  const isEditMode = isExistingStand(stands, currentStand);
  const isNewStand = !isEditMode;

  const handleTypeChange = (type: StandProps['type']) => {
    const size = getSizeForOrientation(type, currentStand.isHorizontal);
    const defaultColor = isNewStand
      ? getSuggestedStandColor({ index: currentStand.index, type }, stands)
      : DefaultTypeColorMap[type];

    setCurrentStand(resizeStand({ ...currentStand, type, color: defaultColor }, size.width, size.height));
  };

  const handleOrientationChange = (isHorizontal: boolean) => {
    const size = getSizeForOrientation(currentStand.type, isHorizontal);

    setCurrentStand(resizeStand({ ...currentStand, isHorizontal }, size.width, size.height));
  };

  const updateField = <K extends keyof StandProps>(field: K, value: StandProps[K]) => {
    const nextStand = { ...currentStand, [field]: value };

    if (field === 'index' && isNewStand) {
      nextStand.color = getSuggestedStandColor(nextStand, stands);
    }

    setCurrentStand(SIZE_FIELDS.includes(field) ? resizeStandToDeclaredSize(nextStand) : nextStand);
  };

  const reset = () => setCurrentStand(DefaultStand);

  const isValid = !!currentStand.index && !!currentStand.type;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) {
      return;
    }

    if (isEditMode) {
      updateStand(currentStand);
      return;
    }

    onAddStand(currentStand);
    reset();
  };

  return {
    stand: currentStand,
    setStand: setCurrentStand,
    isEditMode,
    handleTypeChange,
    handleOrientationChange,
    updateField,
    submit,
    reset,
    isValid
  };
};
