import React from "react";
import { useState } from "react";
import './Styles-CriticalHitsCircles.css'

interface Props {
    count: number;
    type: string; // New prop to represent the hit type
    unitId: number; // New prop to store the current unit's ID
    updateHits: (unitId: number, type: string, hits: number) => void; // New prop for the updateHits function
    initialHits: number;
}

const CriticalHitsCircles: React.FC<Props> = ({ count, type, unitId, updateHits, initialHits }) => {
    const [clickedCircles, setClickedCircles] = useState(
        Array(count).fill(false).map((_, i) => i < initialHits)
    );

    const handleCircleClick = (index: number) => {
        const newClickedCircles = [...clickedCircles];
        newClickedCircles[index] = !newClickedCircles[index];
        setClickedCircles(newClickedCircles);

        // Calculate the number of filled circles
        const filledCircles = newClickedCircles.filter(c => c).length;
        // Update the hits in the parent component
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
