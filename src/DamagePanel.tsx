import { Stack } from '@fluentui/react';
import React from 'react';
import './Styles-DamagePanel.css'

interface DamagePanelProps {
    unit: Unit; // Make sure to define this interface according to your requirements
}

const DamagePanel: React.FC<DamagePanelProps> = ({ unit }) => {
    return (
        <div style={{ border: 'solid black', borderRadius: 10, padding: 5, backgroundColor: 'lightgray', marginTop: 5 }}>
            <Stack>
                <Stack horizontal>
                    <span style={{ fontWeight: 'bold', marginRight: 5 }}>
                        A:
                    </span>
                    {Array.from({ length: unit.BFArmor }, (_, index) => (
                        <button key={index} className='damage-button' onClick={() => { /* Handle click event here */ }}></button>
                    ))}
                </Stack>
                <Stack horizontal>
                    <span style={{ fontWeight: 'bold' }}>
                        S:
                    </span>
                </Stack>
            </Stack>
        </div>
    );
}

export default DamagePanel;
