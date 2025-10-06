export const StandSizes = {
    premium: { width: 3, height: 5.5 },
    standard: { width: 3, height: 3.5 },
    mini: { width: 2, height: 3 },
    other: { width: 3, height: 3 }
} as const;

export const getSizeForOrientation = (
    type: keyof typeof StandSizes,
    isHorizontal: boolean = false
): Readonly<{ width: number; height: number }> => {
    const size = StandSizes[type];

    return isHorizontal
        ? { width: size.height, height: size.width } as const
        : size;
};