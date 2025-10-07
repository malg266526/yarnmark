import React from "react";

interface StandInfoProps {
    start: { row: number; col: number } | undefined;
    end: { row: number; col: number } | undefined;
}

export const StandInfo = ({ start, end }: StandInfoProps) => {
    if (!start || !end) {
        return <div style={{ minWidth: 120 }}>No stand selected</div>;
    }

    const rowCount = Math.abs(end.row - start.row) + 1;
    const colCount = Math.abs(end.col - start.col) + 1;
    const heightM = rowCount * 0.5;
    const widthM = colCount * 0.5;
    const sizeM2 = heightM * widthM;

    return (
        <div style={{ minWidth: 120, padding: 8, background: '#f5f5f5', border: '1px solid #bbb', borderRadius: 4 }}>
            <div><strong>Stand Info</strong></div>
            <div>Height: {heightM} m</div>
            <div>Width: {widthM} m</div>
            <div>Size: {sizeM2} m²</div>
        </div>
    );
};
