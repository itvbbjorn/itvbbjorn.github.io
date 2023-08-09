import { Stack } from '@fluentui/react';
import React, { useState } from 'react';

interface HeatPanelProps {
    unit: Unit;
    updateHeat: (unitId: number, heat: string[]) => void;
}

const HeatPanel: React.FC<HeatPanelProps> = ({ unit, updateHeat }) => {
    // const [clicked, setClicked] = useState({ '1': false, '2': false, '3': false, 'S': false });

    // Define the keys as a type
    type ClickedKeys = '1' | '2' | '3' | 'S';

    // Derive the initial clicked state from the unit's MyHeat property
    const initialClicked: Record<ClickedKeys, boolean> = { '1': false, '2': false, '3': false, 'S': false };

    unit.MyHeat?.forEach((heatValue) => {
        // Narrow the type of heatValue
        const key = heatValue as ClickedKeys;
        if (initialClicked.hasOwnProperty(key)) {
            initialClicked[key] = true;
        }
    });


    const [clicked, setClicked] = useState(initialClicked);

    const convertClickedToHeat = (clicked: { [key: string]: boolean }): string[] => {
        const heatArray: string[] = [];

        Object.keys(clicked).forEach(key => {
            if (clicked[key as keyof typeof clicked]) {
                switch (key) {
                    case '1':
                        heatArray.push(key);
                        break;
                    case '2':
                        heatArray.push(key);
                        break;
                    case '3':
                        heatArray.push(key);
                        break;
                    case 'S':
                        heatArray.push(key);
                        break;
                    default:
                        break;
                }
            }
        });

        return heatArray;
    };

    const handleButtonClick = (key: keyof typeof clicked) => {
        setClicked(prev => {
            const newClicked = { ...prev, [key]: !prev[key] };
            // Here, you'll need to convert `newClicked` to the desired heat array format
            const newHeat = convertClickedToHeat(newClicked);
            updateHeat(unit.MyId!, newHeat);
            return newClicked;
        });
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
