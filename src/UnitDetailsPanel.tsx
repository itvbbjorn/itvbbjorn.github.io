import React from 'react';
import { Panel, Stack } from '@fluentui/react';
import './Styles-UnitDetailsPanel.css';
import UnitDamageTable from './UnitDamageTable';
import HeatPanel from './HeatPanel';

interface UnitDetailsPanelProps {
    unit: Unit;
    isOpen: boolean;
    onClose: () => void;
}

const UnitDetailsPanel: React.FC<UnitDetailsPanelProps> = ({ unit, isOpen, onClose }) => {
    if (!unit) {
        return null;
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

    return (
        <Panel
            isOpen={isOpen}
            onDismiss={onClose}
            headerText={unit.Name}
            closeButtonAriaLabel="Close"
        >
            <Stack horizontal tokens={{ childrenGap: 10 }} horizontalAlign="space-between">
                <Stack verticalAlign="space-between" style={{ height: '100%' }} tokens={{ childrenGap: 40 }}>
                    <Stack>
                        <Stack horizontal tokens={{ childrenGap: 10 }}>
                            <span>Type: {unit.Type.Name}</span>
                            <span>Role: {unit.Role.Name} </span>
                        </Stack>
                        <Stack className='game-properties-stack' horizontal tokens={{ childrenGap: 10 }}>
                            <span className='game-properties'>SZ: {unit.BFSize}</span>
                            <span className='game-properties'>TMM: {calculateTMM(unit)}</span>
                            <span className='game-properties'>MV: {unit.BFMove}</span>
                        </Stack>
                    </Stack>
                    <UnitDamageTable unit={unit} />
                </Stack>
                <img src={unit.ImageUrl} alt={`${unit.Name}`} className='unit-image'></img>
            </Stack>
            <HeatPanel unit={unit} />
        </Panel>
    );





};

export default UnitDetailsPanel;
