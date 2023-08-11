import React, { useState, useEffect } from 'react';
import { DefaultButton, Panel, Dialog, TextField, Stack, FontSizes } from '@fluentui/react';
import './Styles-UnitDetailsPanel.css';
import UnitCard from './UnitCard';
import { Unit } from './Models/Unit';
import { blob } from 'stream/consumers';

interface UnitDetailsPanelProps {
    unit: Unit;
    isOpen: boolean;
    onClose: () => void;
    onAddUnit?: (unit: Unit) => void;
}

const UnitDetailsPanel: React.FC<UnitDetailsPanelProps> = ({ unit, isOpen, onClose, onAddUnit }) => {
    useEffect(() => {
        // Reset skill value when unit changes
        setSkillValue(defaultSkill);
    }, [unit]);

    const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
    const defaultSkill: number = 4;
    const [skillValue, setSkillValue] = useState<number>(defaultSkill);

    if (!unit) {
        return null;
    }

    const calculatePointValue = (baseValue: number, skillDifference: number) => {
        let increaseAdjustment;
        let decreaseAdjustment;

        if (baseValue <= 52) {
            increaseAdjustment = Math.floor((baseValue + 5) / 10);
        } else {
            increaseAdjustment = 10 + Math.ceil((baseValue - 52) / 5);
        }

        if (baseValue <= 104) {
            decreaseAdjustment = Math.floor((baseValue + 10) / 10);
        } else {
            decreaseAdjustment = 10 + Math.ceil((baseValue - 104) / 10);
        }

        if (skillDifference < 0) {
            return baseValue + (increaseAdjustment * Math.abs(skillDifference));
        } else {
            return baseValue - (decreaseAdjustment * skillDifference);
        }
    };




    const handleAddUnit = () => {
        const calculatedValue = calculatePointValue(unit.BFPointValue, skillValue - defaultSkill);
        unit.MyCalculatedPointValue = calculatedValue;

        unit.MySkill = skillValue;

        if (onAddUnit) {
            onAddUnit(unit);
        }
        onClose();
    };


    const incrementSkill = () => {
        if (skillValue < 9) {
            setSkillValue(prevSkill => prevSkill + 1);
        }
    };

    const decrementSkill = () => {
        if (skillValue > 0) {
            setSkillValue(prevSkill => prevSkill - 1);
        }
    };

    return (
        <Panel
            isOpen={isOpen}
            onDismiss={onClose}
            headerText='Unit preview'
            closeButtonAriaLabel="Close"
        >
            <UnitCard unit={unit}></UnitCard>
            <div style={{
                textAlign: 'center',
                margin: '10px 0'
            }}>
            </div>
            <Stack horizontal style={{ margin: '10px 0', alignItems: 'center', justifyContent: 'center' }}>

                <div style={{ width: 'auto', textAlign: 'center', marginRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold' }}>Skill:</span>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '10px'
                    }}>
                        <DefaultButton
                            onClick={decrementSkill}
                            text="-"
                            style={{
                                width: '35px',
                                height: '35px',
                                minWidth: '0',
                                padding: '0',
                            }}
                        />
                        <span style={{ margin: '0 10px', fontSize: 30, fontWeight: 'bold' }}>{skillValue}</span>
                        <DefaultButton
                            onClick={incrementSkill}
                            text="+"
                            style={{
                                width: '35px',
                                height: '35px',
                                minWidth: '0',
                                padding: '0',
                            }}
                        />
                    </div>
                </div>

                <div style={{ width: 'auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', marginRight: '10px' }}>Point Value:</span>
                    <span style={{ color: 'darkred', fontSize: 30, fontWeight: 'bold', marginTop: '10px' }}>{calculatePointValue(unit.BFPointValue, skillValue - defaultSkill)}</span>
                </div>

            </Stack>





            {onAddUnit && (
                <DefaultButton
                    text="Add unit to force"
                    onClick={handleAddUnit}
                    style={{
                        display: 'block',
                        margin: '20px auto',
                        width: 'fit-content'
                    }}
                />
            )}
        </Panel>

    );
};

export default UnitDetailsPanel;
