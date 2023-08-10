import React, { useState } from 'react';
import { DetailsList, IColumn, TextField, CommandBarButton, SelectionMode, Spinner, Stack } from '@fluentui/react';
import axios from 'axios';
import UnitDetailsPanel from './UnitDetailsPanel';
import Names from './Names';
import { Unit } from './Models/Unit';

interface NameListProps {
    onAddUnit: (unit: Unit) => void;
}


const NameList: React.FC<NameListProps> = ({ onAddUnit }) => {
    const [filter, setFilter] = useState('');
    const [filteredNames, setFilteredNames] = useState(Names);
    const [selectedUnit, setSelectedUnit] = useState<any>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = (name: string) => {
        setIsLoading(true);
        const url = `https://masterunitlist.azurewebsites.net/Unit/QuickList?Name=${name}`;
        axios
            .get(url)
            .then(response => handleResponse(response, name))
            .catch(error => {
                console.error('An error occurred:', error);
            })
            .finally(() => {
                setIsLoading(false); 
            });
    };

    // Makes sure we only get the unit we actually clicked 
    const handleResponse = (response: any, name: string) => {
        console.log(response.data);
        if (response.data.Units.length === 1) {
            openUnitDetailsPanel(response.data.Units[0]);
        } else {
            // The names sometimes have 2 trailing whitespaces
            const exactMatchUnit = response.data.Units.find((unit: Unit) => unit.Name.trim() === name.trim());
            openUnitDetailsPanel(exactMatchUnit);
        }
    };

    const openUnitDetailsPanel = (unit: Unit) => {
        setSelectedUnit(unit);
        setIsPanelOpen(true);
    };


    const handleFilterChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setFilter(newValue || '');
        const newFilteredNames = Names.filter(name => name.toLowerCase().includes((newValue || '').toLowerCase()));
        setFilteredNames(newFilteredNames);
    };

    const columns: IColumn[] = [
        {
            key: 'name',
            name: 'Name',
            fieldName: 'name',
            minWidth: 100,
            maxWidth: 200,
            isResizable: true,
            onRender: (item) => (
                <CommandBarButton onClick={() => handleClick(item.name)} text={item.name} />
            ),
        },
    ];

    const items = filteredNames.map(name => ({ name }));

    return (
        <div>
            <TextField label="Filter by name:" onChange={handleFilterChange} value={filter} placeholder='Start typing...' disabled={isLoading} /> {/* Disable input during loading */}
            {isLoading ? ( // Step 3: Conditionally Render
                <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { height: 50 } }}> {/* Centering the spinner */}
                    <Spinner label="Loading..." ariaLive="assertive" labelPosition="right" />
                </Stack>
            ) : filter && (
                <DetailsList items={items} columns={columns} selectionMode={SelectionMode.none} />
            )}
            <UnitDetailsPanel unit={selectedUnit} isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} onAddUnit={onAddUnit} />
        </div>
    );
};

export default NameList;
