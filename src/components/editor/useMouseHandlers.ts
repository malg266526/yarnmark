import { useState, useEffect } from "react";

export const useMouseHandlers = () => {
    const [dragging, setDragging] = useState(false);
    const [start, setStart] = useState<{ row: number; col: number } | null>(null);
    const [end, setEnd] = useState<{ row: number; col: number } | null>(null);

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
        setEnd
    };
};
