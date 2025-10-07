import { StandProps } from "../StandProps";

export const generateStandsJSON = (stands: StandProps[]) => {
    const cleaned = stands.map((stand) => ({
        index: stand.index,
        vendor: stand.vendor ?? null,
        description: stand.description ?? null,
        type: stand.type,
        color: stand.color ?? null,
        width: stand.width ?? null,
        height: stand.height ?? null,
        isHorizontal: stand.isHorizontal ?? false,
        start: stand.start ?? null,
        end: stand.end ?? null,
    }));

    return JSON.stringify(cleaned, null, 2);
};