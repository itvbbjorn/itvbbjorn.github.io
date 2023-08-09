import React, { useState } from 'react';
import './Styles-DamagePanel.css';
import { Stack } from '@fluentui/react';

interface DamagePanelProps {
    unit: Unit;
    updateDamage: (damage: number) => void;
}


const DamagePanel: React.FC<DamagePanelProps> = ({ unit, updateDamage }) => {
    const armorDamage = Math.min(unit.BFArmor, unit.MyDamage ?? 0);
    const structureDamage = Math.max(0, (unit.MyDamage ?? 0) - unit.BFArmor);

    const [clickedArmorButtons, setClickedArmorButtons] = useState(Array(unit.BFArmor).fill(false).map((_, i) => i < armorDamage));
    const [clickedSButtons, setClickedSButtons] = useState(Array(unit.BFStructure).fill(false).map((_, i) => i < structureDamage));

    const handleArmorButtonClick = (index: number) => {
        const newClickedButtons = [...clickedArmorButtons];
        newClickedButtons[index] = !newClickedButtons[index];
        setClickedArmorButtons(newClickedButtons);

        const totalDamage = newClickedButtons.filter(btn => btn).length + clickedSButtons.filter(btn => btn).length;
        updateDamage(totalDamage);
    };

    const handleSButtonClick = (index: number) => {
        // if user is trying to fill a circle, check if all armor circles are not filled 
        if (!clickedSButtons[index] && clickedArmorButtons.some(btn => !btn)) return;
        const newClickedButtons = [...clickedSButtons];
        newClickedButtons[index] = !newClickedButtons[index];
        setClickedSButtons(newClickedButtons);

        const totalDamage = clickedArmorButtons.filter(btn => btn).length + newClickedButtons.filter(btn => btn).length;
        updateDamage(totalDamage);
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
