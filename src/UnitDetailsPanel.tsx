import React, { useState } from 'react';
import { DefaultButton, Panel, Dialog, TextField } from '@fluentui/react';
import './Styles-UnitDetailsPanel.css';
import UnitCard from './UnitCard';
import { Unit } from './Models/Unit';

interface UnitDetailsPanelProps {
    unit: Unit;
    isOpen: boolean;
    onClose: () => void;
    onAddUnit?: (unit: Unit) => void;
}

const UnitDetailsPanel: React.FC<UnitDetailsPanelProps> = ({ unit, isOpen, onClose, onAddUnit }) => {
    const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
    const [skillValue, setSkillValue] = useState<string>("");

    if (!unit) {
        return null;
    }

    const handleAddUnit = () => {
        setIsSkillDialogOpen(true);
    };

    const handleConfirmSkill = () => {
        const parsedValue = parseInt(skillValue);
        if (parsedValue >= 0 && parsedValue <= 9) {
            unit.MySkill = parsedValue;
            if (onAddUnit) {
                onAddUnit(unit);
            }
        }
        setSkillValue(""); 
        setIsSkillDialogOpen(false);
        onClose();
    };

    return (
        <Panel
            isOpen={isOpen}
            onDismiss={onClose}
            headerText='Unit preview'
            closeButtonAriaLabel="Close"
        >
            <UnitCard unit={unit}></UnitCard>
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
            
            <Dialog
                hidden={!isSkillDialogOpen}
                onDismiss={() => setIsSkillDialogOpen(false)}
                dialogContentProps={{
                    title: 'Skill',
                    subText: 'Enter a Skill value between 0-9.',
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 450 } },
                }}
            >
                <TextField
                    value={skillValue}
                    onChange={(_, newValue) => setSkillValue(newValue || "")}
                    type="number"
                    max={9}
                    min={0}
                />
                <DefaultButton
                    text="Confirm"
                    onClick={handleConfirmSkill}
                    style={{
                        display: 'block',
                        margin: '20px auto',
                        width: 'fit-content'
                    }}
                />
            </Dialog>
        </Panel>
    );
};

export default UnitDetailsPanel;
