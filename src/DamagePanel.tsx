import React, { useState, useEffect } from 'react';
import './Styles-DamagePanel.css';
import { Stack } from '@fluentui/react';

interface DamagePanelProps {
    unit: Unit;
    updateDamage: (damage: number) => void;
}

const calculateBackgroundColor = (damage: number, armor: number, structure: number) => {
    const totalHealth = armor + structure;
    const percentageDamage = damage / totalHealth;

    if (damage >= armor) return 'red'; // Equal to or more than the armor value

    if (percentageDamage === 0) return 'lightgrey'; // No damage
    if (percentageDamage < 0.25) return 'lightgrey'; // Low damage
    if (percentageDamage < 0.5) return 'yellow'; // Medium damage
    if (percentageDamage < 0.75) return 'orange'; // High damage
    return 'darkgray'; // Critical damage
};

const DamagePanel: React.FC<DamagePanelProps> = ({ unit, updateDamage }) => {
    const armorDamage = Math.min(unit.BFArmor, unit.MyDamage ?? 0);
    const structureDamage = Math.max(0, (unit.MyDamage ?? 0) - unit.BFArmor);

    const [clickedArmorButtons, setClickedArmorButtons] = useState<boolean[]>(Array(unit.BFArmor).fill(false).map((_, i) => i < armorDamage));
    const [clickedSButtons, setClickedSButtons] = useState<boolean[]>(Array(unit.BFStructure).fill(false).map((_, i) => i < structureDamage));

    useEffect(() => {
        setClickedArmorButtons(Array(unit.BFArmor).fill(false).map((_, i) => i < armorDamage));
        setClickedSButtons(Array(unit.BFStructure).fill(false).map((_, i) => i < structureDamage));
    }, [unit.MyDamage, unit.BFArmor, unit.BFStructure]);

    const handleArmorButtonClick = (index: number) => {
        const newClickedButtons = [...clickedArmorButtons];
        newClickedButtons[index] = !newClickedButtons[index];
        setClickedArmorButtons(newClickedButtons);

        const totalDamage = newClickedButtons.filter(btn => btn).length + clickedSButtons.filter(btn => btn).length;
        updateDamage(totalDamage);
    };

    const handleStructureButtonClick = (index: number) => {
        // if user is trying to fill a circle, check if all armor circles are not filled 
        if (!clickedSButtons[index] && clickedArmorButtons.some(btn => !btn)) return;
        const newClickedButtons = [...clickedSButtons];
        newClickedButtons[index] = !newClickedButtons[index];
        setClickedSButtons(newClickedButtons);

        const totalDamage = clickedArmorButtons.filter(btn => btn).length + newClickedButtons.filter(btn => btn).length;
        updateDamage(totalDamage);
    };


    const totalDamage = clickedArmorButtons.filter(btn => btn).length + clickedSButtons.filter(btn => btn).length;
    const percentageDamage = totalDamage / (unit.BFArmor + unit.BFStructure);
    const backgroundColor = calculateBackgroundColor(totalDamage, unit.BFArmor, unit.BFStructure);
    const isFullyDamaged = percentageDamage === 1;

    return (
        <div
            style={{ border: 'solid black', borderRadius: 10, padding: 5, backgroundColor, marginTop: 5 }}
            className={isFullyDamaged ? 'colored-stripes' : ''}
        >
            <Stack>
                <Stack horizontal>
                    <span className="label" style={{ fontWeight: 'bold' }}>A:</span>
                    {clickedArmorButtons.map((clicked, i) => (
                        <button
                            key={i}
                            className={`circleButton ${clicked ? 'clicked' : ''}`}
                            onClick={() => handleArmorButtonClick(i)}
                        />
                    ))}
                </Stack>
                <Stack horizontal>
                    <span className="label" style={{ fontWeight: 'bold' }}>S:</span>
                    {clickedSButtons.map((clicked, i) => (
                        <button
                            key={i}
                            className={`sCircleButton ${clicked ? 'clicked' : ''}`}
                            onClick={() => handleStructureButtonClick(i)}
                        />
                    ))}
                </Stack>


            </Stack>
        </div>
    );
};

export default DamagePanel;
