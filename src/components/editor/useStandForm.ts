import { useState } from "react";
import { StandColorsMap, StandProps, StandType } from "./StandProps";
import { getSizeForOrientation, StandSizes } from "./utils/getSizeForOrientation";

const DefaultTypeColorMap: Record<StandType, keyof typeof StandColorsMap> = {
    premium: "premium",
    standard: "normal1",
    mini: "small1",
    other: "taken",
};

const DefaultStand: StandProps = {
    index: "",
    type: "standard",
    isHorizontal: false,
    width: StandSizes.standard.width,
    height: StandSizes.standard.height,
    color: DefaultTypeColorMap["standard"],
};

export const useStandForm = (onSubmit: (stand: StandProps) => void) => {
    const [stand, setStand] = useState<StandProps>(DefaultStand);

    const handleTypeChange = (type: StandProps["type"]) => {
        const size = getSizeForOrientation(type, stand.isHorizontal);
        const defaultColor = DefaultTypeColorMap[type];

        setStand({ ...stand, type, width: size.width, height: size.height, color: defaultColor, });
    };

    const handleOrientationChange = (isHorizontal: boolean) => {
        const size = getSizeForOrientation(stand.type, isHorizontal);
        setStand({ ...stand, isHorizontal, width: size.width, height: size.height });
    };

    const updateField = <K extends keyof StandProps>(field: K, value: StandProps[K]) => {
        setStand({ ...stand, [field]: value });
    };

    const reset = () => setStand(DefaultStand);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!stand.index || !stand.type) return;

        console.log('Submitting stand:', stand);

        onSubmit(stand);
        reset();
    };

    return {
        stand,
        setStand,
        handleTypeChange,
        handleOrientationChange,
        updateField,
        submit,
        reset,
        isValid: !!stand.index && !!stand.type,
    };
};
