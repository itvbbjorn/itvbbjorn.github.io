import React, { useEffect } from "react";
import { useState } from "react";
import './Styles-CriticalHitsCircles.css'

interface Props {
    count: number;
    type: string;
    unitId: number;
    updateHits: (unitId: number, type: string, hits: number) => void;
    initialHits: number;
}

const CriticalHitsCircles: React.FC<Props> = ({ count, type, unitId, updateHits, initialHits }) => {
    const [clickedCircles, setClickedCircles] = useState(
        Array(count).fill(false).map((_, i) => i < initialHits)
    );

    // Add useEffect to watch for changes in initialHits
    useEffect(() => {
        setClickedCircles(
            Array(count).fill(false).map((_, i) => i < initialHits)
        );
    }, [initialHits, count]); // Re-run when initialHits or count changes

    const handleCircleClick = (index: number) => {
        const newClickedCircles = [...clickedCircles];
        newClickedCircles[index] = !newClickedCircles[index];
        setClickedCircles(newClickedCircles);

        const filledCircles = newClickedCircles.filter(c => c).length;
        updateHits(unitId, type, filledCircles);
    };

    return (
        <div>
            {clickedCircles.map((clicked, i) => (
                <button
                    key={i}
                    className={`critical-hit-circle ${clicked ? 'clicked' : ''}`}
                    onClick={() => handleCircleClick(i)}
                />
            ))}
        </div>
    );
};

export default CriticalHitsCircles;
