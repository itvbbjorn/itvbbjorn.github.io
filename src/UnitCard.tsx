import { Stack } from '@fluentui/react';
import React from 'react';
import HeatPanel from './HeatPanel';
import DamagePanel from './DamagePanel';
import CriticalHitsPanel from './CriticalHitsPanel';
import AttackDamageTable from './AttackDamageTable';
import { Unit } from './Models/Unit';

interface UnitCardProps {
    unit: Unit;
}
// returns numbers only from BFMove strings. '"12\"j"' returns 12
const extractNumbers = (input: string): number[] => {
    const parts = input.split('/');
    return parts.map(part => {
        const result = part.match(/\d+/g);
        return result ? parseInt(result.join('')) : 0;
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
    const moveDistances = extractNumbers(unit.BFMove);
    const tmms = moveDistances.map(getTMM);
    return tmms.join('/');
};

const UnitCard: React.FC<UnitCardProps> = ({ unit }) => {
    const moveSize = unit.BFMove.length > 3 ? '12px' : '18px';

    return (
        <div style={{ padding: 5, backgroundColor: 'darkgrey', border: 'solid black', borderRadius: 10, margin: 10, position: 'relative' }}>

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
                                <span className='game-properties-value' style={{ fontSize: moveSize }}>{unit.BFMove}</span>
                            </div>
                        </Stack>

                    </Stack>
                    <AttackDamageTable unit={unit} />
                </Stack>
                <Stack.Item styles={{ root: { width: '35%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'solid black', backgroundColor: 'white' } }}>
                    <img src={unit.ImageUrl} alt={`${unit.Name}`} className='unit-image' />
                </Stack.Item>

            </Stack>
            <HeatPanel unit={unit} updateHeat={() => { }} />
            <DamagePanel unit={unit} updateDamage={() => { }} />
            <Stack horizontal styles={{ root: { display: 'flex', width: '100%' } }}>
                <Stack.Item grow={1} styles={{ root: { border: 'solid black', borderRadius: 10, padding: 5, backgroundColor: 'lightgray', marginTop: "5px" } }}>
                    <span style={{ fontWeight: 'bold' }}>
                        SPECIAL:
                    </span>
                    <div style={{ fontWeight: 'bold', color: "darkred", marginLeft: "5px" }}>
                        {unit.BFAbilities}
                    </div>
                    <CriticalHitsPanel unit={unit} updateHits={() => { }} />

                </Stack.Item>
                <Stack.Item grow={1}>

                </Stack.Item>
            </Stack>

        </div>

    )
}

export default UnitCard;