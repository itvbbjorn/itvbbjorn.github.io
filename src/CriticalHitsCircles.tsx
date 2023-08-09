import React from "react";
import { useState } from "react";
import './Styles-CriticalHitsCircles.css'

const CriticalHitsCircles: React.FC<{ count: number }> = ({ count }) => {
    const [clickedCircles, setClickedCircles] = useState(Array(count).fill(false));

    const handleCircleClick = (index: number) => {
        const newClickedCircles = [...clickedCircles];
        newClickedCircles[index] = !newClickedCircles[index];
        setClickedCircles(newClickedCircles);
    };

    return (
        <div>
            {clickedCircles.map((clicked, i) => (
                <button
                    key={i}
                    className={`circleButton ${clicked ? 'clicked' : ''}`}
                    onClick={() => handleCircleClick(i)}
                />
            ))}
        </div>
    );
};

export default CriticalHitsCircles;
