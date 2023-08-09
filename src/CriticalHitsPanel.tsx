import { Stack } from '@fluentui/react';
import React from 'react';
import CriticalHitsCircles from './CriticalHitsCircles';

interface CriticalHitsPanelProps {
    unit: Unit;
}

const CriticalHitsPanel: React.FC<CriticalHitsPanelProps> = ({ unit }) => {
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
                        <span><CriticalHitsCircles count={1} /></span>
                        <span><CriticalHitsCircles count={4} /></span>
                        <span><CriticalHitsCircles count={4} /></span>
                        <span><CriticalHitsCircles count={4} /></span>
                    </Stack>
                    <Stack>
                        <span>+1 Heat/firing weapons</span>
                        <span>+2TN</span>
                        <span>1/2 MV</span>
                        <span>-1 DMG</span>
                    </Stack>
                </Stack>
            </div>
        </Stack>
    )
}

export default CriticalHitsPanel;