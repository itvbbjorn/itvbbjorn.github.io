import { Stack } from '@fluentui/react';
import React, { useState, useEffect } from 'react';
import './Styles-HeatPanel.css'

interface HeatPanelProps {
    unit: Unit;
    updateHeat: (unitId: number, heat: string[]) => void;
}

const HeatPanel: React.FC<HeatPanelProps> = ({ unit, updateHeat }) => {
    // const [clicked, setClicked] = useState({ '1': false, '2': false, '3': false, 'S': false });
    useEffect(() => {
        const newClicked: Record<ClickedKeys, boolean> = { '1': false, '2': false, '3': false, 'S': false };
        unit.MyHeat?.forEach((heatValue) => {
            // Narrow the type of heatValue
            const key = heatValue as ClickedKeys;
            if (newClicked.hasOwnProperty(key)) {
                newClicked[key] = true;
            }
        });
        setClicked(newClicked);
    }, [unit.MyHeat]);

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
            const newClicked = { ...prev };

            // Find the rightmost filled key
            const rightmostFilledKey = (['S', '3', '2', '1'] as ClickedKeys[]).find(k => prev[k]);

            // If the clicked key is the rightmost filled key, unfill all buttons
            if (key === rightmostFilledKey) {
                newClicked['1'] = false;
                newClicked['2'] = false;
                newClicked['3'] = false;
                newClicked['S'] = false;
            } else {
                (['1', '2', '3', 'S'] as ClickedKeys[]).forEach((k) => {
                    if (k <= key) {
                        newClicked[k] = true;
                    } else {
                        newClicked[k] = false;
                    }
                });
            }

            const newHeat = convertClickedToHeat(newClicked);
            updateHeat(unit.MyId!, newHeat);

            return newClicked;
        });
    };

    const getButtonClass = (key: keyof typeof clicked) => {
        return clicked[key] ? 'striped-background' : '';
    };

    const stripeButtons = (key: keyof typeof clicked) => {
        const baseColor = (() => {
            switch (key) {
                case '1':
                    return 'yellow';
                case '2':
                    return 'orange';
                case '3':
                    return 'red';
                case 'S':
                    return 'darkred';
                default:
                    return 'white';
            }
        })();

        if (clicked[key]) {
            return `repeating-linear-gradient(
                -45deg,
                black,
                black 5px,
                ${baseColor} 5px,
                ${baseColor} 10px
            )`;
        }

        return baseColor;
    };

    const getHeatScaleColor = () => {
        const filledButtonsCount = Object.values(clicked).filter(value => value).length;
        switch (filledButtonsCount) {
            case 0:
                return 'lightgrey'; // color when no buttons are filled
            case 1:
                return 'yellow';    // color when one button is filled
            case 2:
                return 'orange';    // color when two buttons are filled
            case 3:
                return 'red';       // color when three buttons are filled
            case 4:
                return 'darkred';   // color when all buttons are filled
            default:
                return 'darkgrey';  // default color
        }
    };

    const heatScaleText = clicked['S'] ? 'SHUT DOWN' : 'HEAT SCALE';

    const getHeatScaleTextColor = () => {
        if (clicked['S']) return 'yellow';
        if (clicked['1']) return 'black';
        return 'white'; // default color
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
                    <span
                        style={{
                            fontWeight: 'bold',
                            backgroundColor: getHeatScaleColor(),
                            color: getHeatScaleTextColor(),
                            padding: 5,
                            borderRadius: 10
                        }}
                    >
                        {heatScaleText}
                    </span>
                </Stack.Item>

                <Stack.Item grow={1}>
                    <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {(['1', '2', '3', 'S'] as (keyof typeof clicked)[]).map(key => (
                            <button
                                key={key}
                                className={getButtonClass(key)}
                                style={{
                                    background: stripeButtons(key),
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
