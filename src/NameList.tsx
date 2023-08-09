import React, { MouseEvent, useState } from 'react';
import { DetailsList, IColumn, TextField, CommandBarButton } from '@fluentui/react';
import axios from 'axios';
import UnitDetailsPanel from './UnitDetailsPanel';
import Names from './Names';

const NameList: React.FC = () => {
    const [filter, setFilter] = useState('');
    const [filteredNames, setFilteredNames] = useState(Names);
    const [selectedUnit, setSelectedUnit] = useState<any>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const handleClick = (name: string) => {

        const url = `https://masterunitlist.azurewebsites.net/Unit/QuickList?Name=${name}`;
        axios
            .get(url)
            .then(response => handleResponse(response, name))
            .catch(error => {
                console.error('An error occurred:', error);
            });
    };

    // Makes sure we only get the unit we actually clicked 
    const handleResponse = (response: any, name: string) => {
        console.log(response.data);
        if (response.data.Units.length === 1) {
            openUnitDetailsPanel(response.data.Units[0]);
        } else {
            console.log("More than one unit returned. Finding exact match from:");
            console.log(response.data);
            // The names sometimes have 2 trailing whitespaces
            const exactMatchUnit = response.data.Units.find((unit: Unit) => unit.Name.trim() === name.trim());
            if (exactMatchUnit) {
                openUnitDetailsPanel(exactMatchUnit);
                console.log("Found exact match:");
                console.log(exactMatchUnit);
            } else {
                console.log(exactMatchUnit);
            }
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
            <TextField label="Filter by name:" onChange={handleFilterChange} value={filter} />
            <DetailsList items={items} columns={columns} />
            <UnitDetailsPanel unit={selectedUnit} isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
        </div>
    );
};

export default NameList;
