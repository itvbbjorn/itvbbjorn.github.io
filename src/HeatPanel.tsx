import { Stack } from '@fluentui/react';
import React, { useState } from 'react';

interface HeatPanelProps {
    unit: Unit;
}

const HeatPanel: React.FC<HeatPanelProps> = ({ unit }) => {
    const [clicked, setClicked] = useState({ '1': false, '2': false, '3': false, 'S': false });

    const handleButtonClick = (key: keyof typeof clicked) => {
        setClicked(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const getButtonColor = (key: keyof typeof clicked) => {
        switch (key) {
            case '1':
                return clicked[key] ? 'white' : 'yellow';
            case '2':
                return clicked[key] ? 'white' : 'orange';
            case '3':
                return clicked[key] ? 'white' : 'red';
            case 'S':
                return clicked[key] ? 'white' : 'darkred';
            default:
                return 'white';
        }
    };

    const getTextColor = (key: keyof typeof clicked) => {
        return clicked[key] ? 'yellow' : key === '2' || key === '3' ? 'white' : 'black';
    };

    return (
        <div style={{ border: 'solid black', borderRadius: 10, padding: 5, backgroundColor: 'lightgray' }}>
            <Stack horizontal verticalAlign='center' horizontalAlign="stretch" tokens={{ childrenGap: 10 }} styles={{ root: { width: '100%' } }}>
                <Stack.Item grow={1}>
                    <span style={{ fontWeight: 'bold' }}>OV: <span style={{ color: 'darkred' }}>{unit.BFOverheat}</span></span>
                </Stack.Item>
                <Stack.Item grow={1}>
                    <span style={{ fontWeight: 'bold', backgroundColor: 'darkgrey', color: 'white', padding: 5, borderRadius: 10 }}>HEAT SCALE</span>
                </Stack.Item>
                <Stack.Item grow={1}>
                    <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {(['1', '2', '3', 'S'] as (keyof typeof clicked)[]).map(key => (
                            <button
                                key={key}
                                style={{
                                    background: getButtonColor(key),
                                    width: '30px',
                                    height: '30px',
                                    fontWeight: 'bold',
                                    color: getTextColor(key),
                                    borderRadius: 5,
                                    border: 'none',
                                }}
                                onClick={() => handleButtonClick(key)}
                            >
                                {key}
                            </button>
                        ))}
                    </span>
                </Stack.Item>
            </Stack>
        </div>
    );
};

export default HeatPanel;
