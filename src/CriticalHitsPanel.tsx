import { Stack } from '@fluentui/react';
import React, { useState } from 'react';
import CriticalHitsCircles from './CriticalHitsCircles';

interface CriticalHitsPanelProps {
    unit: Unit;
}

const CriticalHitsPanel: React.FC<CriticalHitsPanelProps> = ({ unit }) => {
    return (
        <Stack>
            <span style={{ color: 'white', backgroundColor: 'black', textAlign: 'center', fontWeight: 'bold', padding: 2 }}>CRITICAL HITS</span>
            <Stack horizontal>
                ENGINE
                <CriticalHitsCircles count={1} />
                +1 Heat/firing weapons
            </Stack>
            <Stack horizontal>
                FIRE CONTROL
                <CriticalHitsCircles count={4} /> +2TN
            </Stack>
            <Stack horizontal>
                MP
                <CriticalHitsCircles count={4} />1/2 MV
            </Stack>
            <Stack horizontal>
                WEAPONS
                <CriticalHitsCircles count={4} />-1 DMG
            </Stack>

        </Stack>
    )
}

export default CriticalHitsPanel;