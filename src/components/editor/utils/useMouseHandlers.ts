import { useState, useEffect } from "react";
import { getEndFromStart } from "./getEndFromStart";

export const useMouseHandlers = () => {
    const [dragging, setDragging] = useState(false);
    const [start, setStart] = useState<{ row: number; col: number } | undefined>(undefined);
    const [end, setEnd] = useState<{ row: number; col: number } | undefined>(undefined);

    const handleMouseDown = (row: number, col: number) => {
        setStart({ row, col });
        setEnd({ row, col });
        setDragging(true);
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (dragging) {
            setEnd({ row, col });
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };


    const handleClick = (
        row: number,
        col: number,
        standWidth: number,
        standHeight: number,
        isHorizontal: boolean
    ) => {
        const start = { row, col };
        const end = getEndFromStart(start, standWidth, standHeight, isHorizontal);
        setStart(start);
        setEnd(end);
        setDragging(false); // optional: no dragging for fixed-size
    };


    useEffect(() => {
        const handleWindowMouseUp = () => setDragging(false);
        window.addEventListener('mouseup', handleWindowMouseUp);
        return () => window.removeEventListener('mouseup', handleWindowMouseUp);
    }, []);

    return {
        dragging,
        start,
        end,
        handleMouseDown,
        handleMouseEnter,
        handleMouseUp,
        setStart,
        setEnd,
        handleClick
    };
};
