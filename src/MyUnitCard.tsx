import { Stack, Icon } from '@fluentui/react';
import React from 'react';
import HeatPanel from './HeatPanel';
import DamagePanel from './DamagePanel';
import CriticalHitsPanel from './CriticalHitsPanel';
import AttackDamageTable from './AttackDamageTable';
import { Dialog } from '@fluentui/react';
import { PrimaryButton, DefaultButton } from '@fluentui/react';
import { Unit } from './Models/Unit';


interface UnitCardProps {
    unit: Unit;
    updateHeat: (unitId: number, heat: string[]) => void;
    updateDamage: (unitId: number, damage: number) => void;
    updateHits: (unitId: number, type: string, hits: number) => void;
    removeUnit: (unitId: number) => void;
}

// returns numbers only from BFMove strings. '"12\"j"' returns 12
const extractNumbers = (input: string, mphits: number): number[] => {
    const parts = input.split('/');
    return parts.map(part => {
        const result = part.match(/\d+/g);
        let numberValue = result ? parseInt(result.join('')) : 0;
        // Half MP for critical hits
        for(let i = 0; i < mphits; i++) {
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
    return originalParts.map(part => {
        const numberMatch = part.match(/\d+/g);
        let numberValue = numberMatch ? parseInt(numberMatch[0]) : 0;
        for(let i = 0; i < (unit.MyMPHits || 0); i++) {
            numberValue = Math.round(numberValue / 2);
        }

        return part.replace(/\d+/g, numberValue.toString());
    }).join('/');
};




const MyUnitCard: React.FC<UnitCardProps> = ({ unit, updateHeat, updateDamage, updateHits, removeUnit }) => {
    const [isDialogVisible, setDialogVisible] = React.useState(false);
    const toggleDialog = () => {
        setDialogVisible(!isDialogVisible);
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

    const moveSize = unit.BFMove.length > 3 ? '12px' : '18px';

    return (
        <div style={{ padding: 5, backgroundColor: 'darkgrey', border: 'solid black', borderRadius: 10, margin: 10, position: 'relative' }}>
            <Icon
                iconName="Delete" // Name of the "X" icon
                onClick={handleRemove} // Callback to remove the unit
                style={{ cursor: 'pointer', position: 'absolute', top: 11, right: 7 }} // Style to position the icon
            />
            {/* <Icon
                iconName="Delete"
                onClick={() => { console.log(unit.MyId) }}
                style={{ cursor: 'pointer', position: 'absolute', top: 11, right: 25 }}
            /> */}

            <span style={{ fontSize: 24, fontWeight: 'bold' }}>{unit.Name}</span>
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
                            <span style={{ fontSize: 30, fontWeight: 'bold', color: 'darkred' }}>{unit.BFPointValue}</span>
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
                                <span className='game-properties-value' style={{ fontSize: moveSize }}>{calculateAdjustedMV(unit)}</span>
                            </div>
                        </Stack>

                    </Stack>
                    <AttackDamageTable unit={unit} />
                </Stack>
                <Stack.Item styles={{ root: { width: '35%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'solid black', backgroundColor: 'white' } }}>
                    <img src={unit.ImageUrl} alt={`${unit.Name}`} className='unit-image' />
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
                        {unit.BFAbilities}
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

        </div>

    )
}

export default MyUnitCard;