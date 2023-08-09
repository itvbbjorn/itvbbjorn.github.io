import React, { useState } from 'react';
import './Styles-DamagePanel.css';
import { Stack } from '@fluentui/react';

interface DamagePanelProps {
    unit: {
        BFArmor: number;
        BFStructure: number; // You'll need to replace this with the actual property name for the "S" value
    };
}

const DamagePanel: React.FC<DamagePanelProps> = ({ unit }) => {
    const [clickedArmorButtons, setClickedArmorButtons] = useState(Array(unit.BFArmor).fill(false));
    const [clickedSButtons, setClickedSButtons] = useState(Array(unit.BFStructure).fill(false));

    const handleArmorButtonClick = (index: number) => {
        const newClickedButtons = [...clickedArmorButtons];
        newClickedButtons[index] = !newClickedButtons[index];
        setClickedArmorButtons(newClickedButtons);
    };

    const handleSButtonClick = (index: number) => {
        const newClickedButtons = [...clickedSButtons];
        newClickedButtons[index] = !newClickedButtons[index];
        setClickedSButtons(newClickedButtons);
    };

    return (
        <div style={{ border: 'solid black', borderRadius: 10, padding: 5, backgroundColor: 'lightgray', marginTop: 5 }}>
            <Stack>
                <Stack horizontal>
                    <span style={{ fontWeight: 'bold' }}>A:</span>
                    {clickedArmorButtons.map((clicked, i) => (
                        <button
                            key={i}
                            className={`circleButton ${clicked ? 'clicked' : ''}`}
                            onClick={() => handleArmorButtonClick(i)}
                        />
                    ))}
                </Stack>
                <Stack horizontal>
                    <span style={{ fontWeight: 'bold' }}>S:</span>
                    {clickedSButtons.map((clicked, i) => (
                        <button
                            key={i}
                            className={`sCircleButton ${clicked ? 'clicked' : ''}`}
                            onClick={() => handleSButtonClick(i)}
                        />
                    ))}
                </Stack>
            </Stack>
        </div>
    );
};

export default DamagePanel;
