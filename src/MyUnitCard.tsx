import { Stack } from '@fluentui/react';
import React from 'react';
import HeatPanel from './HeatPanel';
import DamagePanel from './DamagePanel';
import CriticalHitsPanel from './CriticalHitsPanel';
import AttackDamageTable from './AttackDamageTable';

interface UnitCardProps {
    unit: Unit;
    updateHeat: (unitId: number, heat: string[]) => void;
    updateDamage: (unitId: number, damage: number) => void;
    updateHits: (unitId: number, type: string, hits: number) => void;
}
// returns numbers only from BFMove strings. '"12\"j"' returns 12
// TODO: Handle units with multiple movement/TMM i.e Flea
const extractNumbers = (input: string) => {
    const result = input.match(/\d+/g);
    return result ? parseInt(result.join('')) : 0;
}

const calculateTMM = (unit: Unit) => {
    let moveDistance = extractNumbers(unit.BFMove);
    switch (true) {
        case moveDistance <= 4:
            return 0;
        case moveDistance <= 8:
            return 1;
        case moveDistance <= 12:
            return 2;
        case moveDistance <= 18:
            return 3;
        case moveDistance <= 34:
            return 4;
        case moveDistance <= 48:
            return 5;
        default:
            return 6;
    }
}

const MyUnitCard: React.FC<UnitCardProps> = ({ unit, updateHeat, updateDamage, updateHits }) => {
    return (
        <div style={{ padding: 5 }}>
            <span style={{ fontSize: 24, fontWeight: 'bold' }}>{unit.Name}</span>
            <Stack horizontal tokens={{ childrenGap: 10 }} horizontalAlign="space-between">
                <Stack verticalAlign="space-between" style={{ height: '100%' }} tokens={{ childrenGap: 40 }}>
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
                        <Stack className='game-properties-stack' horizontal tokens={{ childrenGap: 10 }} >
                            <span className='game-properties'>SZ: {unit.BFSize}</span>
                            <span className='game-properties'>TMM: {calculateTMM(unit)}</span>
                            <span className='game-properties'>MV: {unit.BFMove}</span>
                        </Stack>
                    </Stack>
                    <AttackDamageTable unit={unit} />
                </Stack>
                <Stack.Item styles={{ root: { width: '35%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' } }}>
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
        </div>
    )
}

export default MyUnitCard;