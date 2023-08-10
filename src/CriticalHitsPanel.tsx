import { Stack } from '@fluentui/react';
import React from 'react';
import CriticalHitsCircles from './CriticalHitsCircles';
import { Unit } from './Models/Unit';

interface CriticalHitsPanelProps {
    unit: Unit;
    updateHits: (unitId: number, type: string, hits: number) => void;
}

const CriticalHitsPanel: React.FC<CriticalHitsPanelProps> = ({ unit, updateHits }) => {
    if (unit.MyId === undefined) {
        return null;
    }
    return (
        <Stack>
            <span style={{ color: 'white', backgroundColor: 'black', textAlign: 'center', fontWeight: 'bold', padding: 2, borderRadius: 10, marginTop: 5, marginBottom: 5 }}>CRITICAL HITS</span>
            <div>
                <Stack horizontal style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Stack style={{ fontWeight: 'bold' }}>
                        <span>ENGINE</span>
                        <span>FIRE CONTROL</span>
                        <span>MP</span>
                        <span>WEAPONS</span>

                    </Stack>
                    <Stack>
                        <CriticalHitsCircles count={1} type="MyEngineHits" unitId={unit.MyId} updateHits={updateHits} initialHits={unit.MyEngineHits || 0} />
                        <CriticalHitsCircles count={4} type="MyFCHits" unitId={unit.MyId} updateHits={updateHits} initialHits={unit.MyFCHits || 0} />
                        <CriticalHitsCircles count={4} type="MyMPHits" unitId={unit.MyId} updateHits={updateHits} initialHits={unit.MyMPHits || 0} />
                        <CriticalHitsCircles count={4} type="MyWeaponHits" unitId={unit.MyId} updateHits={updateHits} initialHits={unit.MyWeaponHits || 0} />
                    </Stack>
                    <Stack>
                        <span>+1 Heat/firing weapons</span>
                        <span>+2TN Each</span>
                        <span>1/2 MV Each</span>
                        <span>-1 Damage Each</span>
                    </Stack>
                </Stack>
            </div>
        </Stack>
    )
}

export default CriticalHitsPanel;