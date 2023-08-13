import { Stack, Icon, Panel, TextField, Label } from '@fluentui/react';
import React, { useState } from 'react';
import HeatPanel from './HeatPanel';
import DamagePanel from './DamagePanel';
import CriticalHitsPanel from './CriticalHitsPanel';
import AttackDamageTable from './AttackDamageTable';
import { Dialog } from '@fluentui/react';
import { PrimaryButton, DefaultButton } from '@fluentui/react';
import { Unit } from './Models/Unit';
import AbilityModal from './AbilityModal';


interface UnitCardProps {
    unit: Unit;
    useHexes: boolean;
    updateHeat: (unitId: number, heat: string[]) => void;
    updateDamage: (unitId: number, damage: number) => void;
    updateHits: (unitId: number, type: string, hits: number) => void;
    removeUnit: (unitId: number) => void;
    onUnitUpdate: (updatedUnit: Unit) => void;
    isPreview: boolean;
    skillValue?: number;
    pointValue?: number;
}

// returns numbers only from BFMove strings. '"12\"j"' returns 12
const extractNumbers = (input: string, mphits: number): number[] => {
    const parts = input.split('/');
    return parts.map(part => {
        const result = part.match(/\d+/g);
        let numberValue = result ? parseInt(result.join('')) : 0;
        // Half MP for critical hits
        for (let i = 0; i < mphits; i++) {
            numberValue = Math.round(numberValue / 2);
        }
        return numberValue;
    });
};


const getTMM = (moveDistance: number) => {
    switch (true) {
        case moveDistance <= 4: return 0;
        case moveDistance <= 8: return 1;
        case moveDistance <= 12: return 2;
        case moveDistance <= 18: return 3;
        case moveDistance <= 34: return 4;
        case moveDistance <= 48: return 5;
        default: return 6;
    }
};
// handles cases where a unit has multiple TMMs
const calculateTMM = (unit: Unit) => {
    const moveDistances = extractNumbers(unit.BFMove, unit.MyMPHits || 0);
    const tmms = moveDistances.map(getTMM);
    return tmms.join('/');
};
const calculateAdjustedMV = (unit: Unit): string => {
    const originalParts = unit.BFMove.split('/');
    const heatAdjustment = unit.MyHeat?.length || 0;

    return originalParts.map(part => {
        const endingCharMatch = part.match(/[a-zA-Z]$/);
        const hasEndingChar = endingCharMatch && endingCharMatch.length > 0;
        const endingChar = hasEndingChar ? endingCharMatch[0] : '';

        const numberMatch = part.match(/\d+/g);
        let numberValue = numberMatch ? parseInt(numberMatch[0]) : 0;

        // half MV for critical hits
        for (let i = 0; i < (unit.MyMPHits || 0); i++) {
            numberValue = Math.round(numberValue / 2);
        }

        // Apply heat adjustments, but only ignore if it ends with 'j'
        if (endingChar !== 'j') {
            numberValue -= heatAdjustment * 2;
        }

        numberValue = Math.max(0, numberValue);

        return hasEndingChar ? `${numberValue}${endingChar}` : `${numberValue}`;
    }).join('/');
};







const MyUnitCard: React.FC<UnitCardProps> = ({ unit, onUnitUpdate, updateHeat, updateDamage, updateHits, removeUnit, useHexes, isPreview, skillValue, pointValue }) => {
    const [isDialogVisible, setDialogVisible] = React.useState(false);
    const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
    const [selectedAbility, setSelectedAbility] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editedName, setEditedName] = useState(unit.Name || "");
    const [editedBorderColor, setEditedBorderColor] = useState(unit.MyBorderColor || "#000000");
    const toggleDialog = () => {
        setDialogVisible(!isDialogVisible);
    };

    const colorOptions = ["black", "darkred", "darkblue", "darkorange", "darkgreen", "gold", "#F0E68C", "#FF6347", "#8A2BE2", "#20B2AA"];
    const displayedSkill = isPreview && (skillValue !== undefined) ? skillValue : unit.MySkill;
    const displayedCost = isPreview && pointValue ? pointValue : unit.MySkill;

    const saveEdits = () => {
        const updatedUnit = { ...unit, Name: editedName, MyBorderColor: editedBorderColor };
        onUnitUpdate(updatedUnit);
        setIsEditPanelOpen(false);
    };

    const handleRemove = () => {
        console.log("removing" + unit.MyId)
        toggleDialog();
    };

    const confirmRemove = () => {
        if (typeof unit.MyId === 'number') {
            console.log("confirm remove" + unit.MyId)
            removeUnit(unit.MyId);
        }
        toggleDialog();
    };
    const getFontSizeForName = (name: string): string => {
        if (name.length > 46) {
            return '10px'
        } else if (name.length > 38) {
            return '12px';
        } else if (name.length > 32) {
            return '14px';
        } else if (name.length > 26) {
            return '18px';
        } else if (name.length > 18) {
            return '20px';
        } else {
            return '24px';  // default size
        }
    };

    const moveSize = unit.BFMove.length > 3 ? '12px' : '18px';

    const adjustedMV = calculateAdjustedMV(unit);

    const halveMovementValue = (mv: string) => {
        return mv.split('/').map(value => {
            const numberPart = parseInt(value.match(/\d+/g)![0]);
            const halvedValue = Math.floor(numberPart / 2);

            const endingCharMatch = value.match(/[a-zA-Z]$/);
            const endingChar = endingCharMatch ? endingCharMatch[0] : '';

            return endingChar ? `${halvedValue}${endingChar}` : `${halvedValue}`;
        }).join('/');
    };

    const displayedMV = useHexes ? halveMovementValue(adjustedMV) : adjustedMV;

    return (
        <div style={{
            padding: 5,
            backgroundColor: 'darkgrey',
            border: 'solid',
            borderColor: unit.MyBorderColor,
            borderRadius: 10,
            margin: 10,
            position: 'relative',
            width: '322px',
            // height: '493px',
            height: isPreview ? '390px' : '493px',
            overflow: 'hidden'
        }}>
            {!isPreview &&
                <Icon
                    iconName='Edit'
                    style={{ cursor: 'pointer', position: 'absolute', top: 11, right: 30 }}
                    onClick={() => setIsEditPanelOpen(true)}
                ></Icon>
            }

            {!isPreview &&
                <Icon
                    iconName="Delete"
                    onClick={handleRemove}
                    style={{ cursor: 'pointer', position: 'absolute', top: 11, right: 7 }}
                />
            }



            <div style={{
                height: '32px',
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                overflow: 'hidden'
            }}>
                <span style={{ fontSize: getFontSizeForName(unit.Name), fontWeight: 'bold' }}>
                    {unit.Name}
                </span>
            </div>

            <Stack horizontal tokens={{ childrenGap: 10 }} horizontalAlign="space-between">
                <Stack verticalAlign="space-between" style={{ height: '100%' }} tokens={{ childrenGap: 30 }}>
                    <Stack>
                        <Stack horizontal style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Stack horizontal tokens={{ childrenGap: 10 }}>

                                <Stack tokens={{ childrenGap: 5 }}>
                                    <span>Type: {unit.Type.Name}</span>
                                    <span>Role: {unit.Role.Name} </span>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack className='game-properties-stack' horizontal tokens={{ childrenGap: 10 }}>
                            <div className='game-properties-container'>
                                <span className='game-properties-title'>SZ:</span>
                                <span className='game-properties-value'>{unit.BFSize}</span>
                            </div>
                            <div className='game-properties-container'>
                                <span className='game-properties-title'>TMM:</span>
                                <span className='game-properties-value'>{calculateTMM(unit)}</span>
                            </div>
                            <div className='game-properties-container'>
                                <span className='game-properties-title'>MV:</span>
                                {/* <span className='game-properties-value' style={{ fontSize: moveSize }}>{calculateAdjustedMV(unit)}</span> */}
                                <span className='game-properties-value' style={{ fontSize: moveSize }}>{displayedMV}</span>
                            </div>
                        </Stack>

                    </Stack>
                    <AttackDamageTable unit={unit} />
                </Stack>
                <Stack.Item
                    styles={{
                        root: {
                            width: '35%',
                            height: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: 'solid black',
                            backgroundColor: 'white',
                            position: 'relative'
                        }
                    }}
                >
                    <img src={unit.ImageUrl} alt={`${unit.Name}`} className='unit-image' />
                    <div
                        style={{
                            position: 'absolute',
                            top: '0%',
                            right: '0%',
                            fontSize: 'large',
                            fontWeight: 'bold',
                            color: 'darkred',
                            padding: '5px 5px'
                        }}
                    >
                        {/* {isPreview ? displayedCost : unit.MyCalculatedPointValue} */}
                        {isPreview ? displayedCost : (unit.MyCalculatedPointValue !== undefined ? unit.MyCalculatedPointValue : unit.BFPointValue)}
                    </div>
                    {/* {!isPreview && */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '0%',
                            left: '0%',
                            fontSize: 'large',
                            fontWeight: 'bold',
                            color: 'black',
                            background: 'white',
                            borderRight: 'solid black',
                            borderBottom: 'solid black',
                            padding: '5px 10px'
                        }}
                    >
                        {displayedSkill}
                    </div>
                    {/* } */}

                </Stack.Item>
            </Stack>
            <HeatPanel unit={unit} updateHeat={updateHeat} />
            <DamagePanel unit={unit} updateDamage={(damage) => updateDamage(unit.MyId!, damage)} />
            <Stack horizontal styles={{ root: { display: 'flex', width: '100%' } }}>
                <Stack.Item grow={1} styles={{ root: { border: 'solid black', borderRadius: 10, padding: 5, backgroundColor: 'lightgray', marginTop: "5px" } }}>
                    <span style={{ fontWeight: 'bold' }}>
                        SPECIAL:
                    </span>
                    <div style={{ fontWeight: 'bold', color: "darkred", marginLeft: "5px" }}>
                        {unit.BFAbilities.split(',').map((ability, index) => (
                            <span
                                key={index}
                                style={{ cursor: 'pointer'}}
                                onClick={() => {
                                    setSelectedAbility(ability.trim());
                                    setIsModalOpen(true);
                                }}
                            >
                                {ability.trim()}
                                {index !== unit.BFAbilities.split(',').length - 1 && ', '}
                            </span>
                        ))}
                    </div>

                    <CriticalHitsPanel unit={unit} updateHits={updateHits} />

                </Stack.Item>
                <Stack.Item grow={1}>

                </Stack.Item>
            </Stack>
            <Dialog
                hidden={!isDialogVisible}
                onDismiss={toggleDialog}
                dialogContentProps={{

                    title: 'Delete Unit',
                    subText: `Are you sure you want to delete ${unit.Name}?`,
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 450 } },
                }}
            >
                <Stack horizontal tokens={{ childrenGap: 10 }}>
                    <PrimaryButton onClick={confirmRemove} text="Confirm" />
                    <DefaultButton onClick={toggleDialog} text="Cancel" />
                </Stack>
            </Dialog>
            <Panel isOpen={isEditPanelOpen} onDismiss={() => setIsEditPanelOpen(false)} headerText="Edit Unit">
                <TextField
                    label="Unit Name"
                    value={editedName}
                    onChange={(e, newValue) => setEditedName(newValue || "")}
                />
                <Label>Border color</Label>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', maxWidth: '150px' }}>
                    {colorOptions.map(color => (
                        <div
                            key={color}
                            style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: color,
                                margin: '5px',
                                cursor: 'pointer',
                                border: editedBorderColor === color ? '2px solid black' : '2px solid transparent',
                                boxSizing: 'border-box'
                            }}
                            onClick={() => setEditedBorderColor(color)}
                        />
                    ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                    <PrimaryButton onClick={saveEdits} style={{ marginRight: '10px' }} text="Save" />
                    <DefaultButton onClick={() => setIsEditPanelOpen(false)} text="Cancel" />
                </div>
            </Panel>
            <AbilityModal
                ability={selectedAbility}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>

    )
}

export default MyUnitCard;