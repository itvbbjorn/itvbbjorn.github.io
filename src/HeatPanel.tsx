import { Stack } from '@fluentui/react';
import React from 'react';

interface HeatPanelProps {
    unit: Unit;
}

const HeatPanel: React.FC<HeatPanelProps> = ({ unit }) => {
    return (
        <div style={{ border: 'solid black', borderRadius: 10, padding: 5, backgroundColor: 'lightgray' }}>
            <Stack horizontal verticalAlign='center' horizontalAlign="stretch" tokens={{ childrenGap: 10 }} styles={{ root: { width: '100%' } }}>
                <Stack.Item grow={1}>
                    <span style={{ fontWeight: 'bold' }}>OV: <span style={{ color: 'red' }}>{unit.BFOverheat}</span></span>
                </Stack.Item>
                <Stack.Item grow={1}>
                    <span style={{ fontWeight: 'bold', backgroundColor: 'darkgrey', color: 'white', padding: 5, borderRadius: 10 }}>HEAT SCALE</span>
                </Stack.Item>
                <Stack.Item grow={1}>
                    <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button style={{ background: 'yellow', width: '30px', height: '30px', fontWeight: 'bold', borderRadius: 5, border: 'none' }}>1</button>
                        <button style={{ background: 'orange', width: '30px', height: '30px', fontWeight: 'bold', color: 'white', borderRadius: 5, border: 'none' }}>2</button>
                        <button style={{ background: 'red', width: '30px', height: '30px', fontWeight: 'bold', color: 'white', borderRadius: 5, border: 'none' }}>3</button>
                        <button style={{ background: 'darkred', width: '30px', height: '30px', fontWeight: 'bold', color: 'white', borderRadius: 5, border: 'none' }}>S</button>
                    </span>
                </Stack.Item>
            </Stack>
        </div>
    );
}

export default HeatPanel;
