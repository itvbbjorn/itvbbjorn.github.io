import React, { useState } from 'react';
import { DefaultButton, DetailsList, IColumn, Modal, Panel, ResponsiveMode, SelectionMode } from '@fluentui/react';
import NameList from './NameList';
import MyUnitCard from './MyUnitCard';
import './Styles-MyUnits.css'

const MyUnits: React.FC = () => {
    const [units, setUnits] = useState<Unit[]>([]);
    const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
    const [isNameListPanelOpen, setIsNameListPanelOpen] = useState(false);
    const [lastId, setLastId] = useState(0); // Keep track of the last used MyId

    const addUnit = (unit: Unit) => {
        const newId = lastId + 1; // Increment the last used MyId
        setLastId(newId); // Update the state with the new lastId

        // Create a copy of the unit object, setting the MyId property
        const newUnit = { ...unit, MyId: newId };

        setUnits([...units, newUnit]);
        setIsNameListPanelOpen(false); // Closing the NameList panel after adding the unit
    };

    const removeUnit = (unitId: number) => {
        setUnits(prevUnits => prevUnits.filter(unit => unit.MyId !== unitId));
    };

    const updateHeat = (unitId: number, heat: string[]) => {
        setUnits(prevUnits =>
            prevUnits.map(unit => (unit.MyId === unitId ? { ...unit, MyHeat: heat } : unit))
        );
    };
    const updateDamage = (unitId: number, damage: number) => {
        setUnits(prevUnits =>
            prevUnits.map(unit => (unit.MyId === unitId ? { ...unit, MyDamage: damage } : unit))
        );
    };
    const updateHits = (unitId: number, type: string, hits: number) => {
        setUnits(prevUnits =>
            prevUnits.map(unit =>
                unit.MyId === unitId
                    ? { ...unit, [type]: hits }
                    : unit
            )
        );
    };


    const columns: IColumn[] = [
        { key: 'MyDamage', name: 'D', fieldName: 'MyDamage', minWidth: 20, maxWidth: 30 },
        {

            key: 'name',
            name: 'Name',
            fieldName: 'Name',
            minWidth: 100,
            maxWidth: 200,
            onRender: (item: Unit) => (
                <span onClick={() => onUnitClick(item)}>{item.Name}</span>
            ),
        },
        { key: 'groupName', name: 'Group Name', fieldName: 'GroupName', minWidth: 100, maxWidth: 200 },

        // Add other columns as needed to display the fields you want
    ];

    const openPanel = () => setIsNameListPanelOpen(true);
    const dismissPanel = () => setIsNameListPanelOpen(false);

    const onUnitClick = (unit?: Unit) => {
        console.log(unit);
        setSelectedUnit(unit || null);
    };

    const closeModal = () => {
        setSelectedUnit(null);
    };
    return (
        <div>
            <div className="cardsGrid"> {/* Grid container */}
                {units.map((unit) => (
                    <div className="cardContainer" key={unit.MyId} onClick={() => onUnitClick(unit)}>
                        <MyUnitCard
                            unit={unit}
                            updateHeat={updateHeat}
                            updateDamage={updateDamage}
                            updateHits={updateHits}
                            removeUnit={removeUnit}
                        />
                    </div>
                ))}
            </div>

            <DefaultButton text="Add Unit" onClick={openPanel} />

            <Panel isOpen={isNameListPanelOpen} onDismiss={() => setIsNameListPanelOpen(false)} headerText="Add Unit">
                <NameList onAddUnit={addUnit} />
            </Panel>
        </div>
    );

    // return (
    //     <div style={{}}>

    //         {units.map((unit) => (
    //             // <div style={{ border: 'solid black', borderRadius: 10, margin: 5, marginBottom: 10, marginTop: 10 }}>
    //             <MyUnitCard
    //                 key={unit.MyId}
    //                 unit={unit}
    //                 updateHeat={updateHeat}
    //                 updateDamage={updateDamage}
    //                 updateHits={updateHits}
    //             />
    //             // </div>
    //         ))}

    //         <DefaultButton text="Add Unit" onClick={openPanel} />

    //         <Panel isOpen={isNameListPanelOpen} onDismiss={() => setIsNameListPanelOpen(false)} headerText="Add Unit">
    //             <NameList onAddUnit={addUnit} />
    //         </Panel>

    //     </div>
    // );
    // return (
    //     <div>
    //         <DetailsList
    //             items={units}
    //             columns={columns}
    //             selectionMode={SelectionMode.none}
    //             onItemInvoked={onUnitClick} // Handle item click
    //         />
    //         <DefaultButton
    //             text="Add Unit"
    //             onClick={openPanel}
    //         />
    //         <Panel
    //             isOpen={isNameListPanelOpen}
    //             onDismiss={() => setIsNameListPanelOpen(false)}
    //             headerText="Add Unit"
    //         >
    //             <NameList onAddUnit={addUnit} />
    //         </Panel>
    //         <Modal
    //             isOpen={selectedUnit !== null}
    //             onDismiss={closeModal}
    //             isBlocking={false}
    //         >
    //             {selectedUnit && <MyUnitCard unit={selectedUnit} updateHeat={updateHeat} updateDamage={updateDamage} updateHits={updateHits} />}
    //         </Modal>
    //     </div>
    // );
};

export default MyUnits;
