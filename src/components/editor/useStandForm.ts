import { useState } from "react";
import { StandInfoType } from "./StandInfoType";
import { getSizeForOrientation, StandSizes } from "./getSizeForOrientation";

const DefaultStand: StandInfoType = {
    index: "",
    type: "standard",
    isHorizontal: false,
    width: StandSizes.standard.width,
    height: StandSizes.standard.height,
};

export const useStandForm = (onSubmit: (stand: StandInfoType) => void) => {
    const [stand, setStand] = useState<StandInfoType>(DefaultStand);

    const handleTypeChange = (type: StandInfoType["type"]) => {
        const size = getSizeForOrientation(type, stand.isHorizontal);
        setStand({ ...stand, type, width: size.width, height: size.height });
    };

    const handleOrientationChange = (isHorizontal: boolean) => {
        const size = getSizeForOrientation(stand.type, isHorizontal);
        setStand({ ...stand, isHorizontal, width: size.width, height: size.height });
    };

    const updateField = <K extends keyof StandInfoType>(field: K, value: StandInfoType[K]) => {
        setStand({ ...stand, [field]: value });
    };

    const reset = () => setStand(DefaultStand);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!stand.index || !stand.type) return;
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
