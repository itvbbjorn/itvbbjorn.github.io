import React from 'react';
import { Panel } from '@fluentui/react';
import './Styles-UnitDetailsPanel.css';
import UnitCard from './UnitCard';

interface UnitDetailsPanelProps {
    unit: Unit;
    isOpen: boolean;
    onClose: () => void;
}

const UnitDetailsPanel: React.FC<UnitDetailsPanelProps> = ({ unit, isOpen, onClose }) => {

    if (!unit) {
        return null;
    }
    return (
        <Panel
            isOpen={isOpen}
            onDismiss={onClose}
            headerText={unit.Name}
            closeButtonAriaLabel="Close"
        >
            <UnitCard unit={unit}></UnitCard>
        </Panel>
    );
};

export default UnitDetailsPanel;
