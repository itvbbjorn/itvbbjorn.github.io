import React, { useState, useEffect } from 'react';
import { DefaultButton, Panel, Dialog, DialogFooter, PrimaryButton } from '@fluentui/react';
import NameList from './NameList';
import MyUnitCard from './MyUnitCard';
import './Styles-MyUnits.css';
import { Unit } from './Models/Unit';

const MyUnits: React.FC = () => {
    const [units, setUnits] = useState<Unit[]>([]);
    const [, setLastId] = useState(0);
    const [isNameListPanelOpen, setIsNameListPanelOpen] = useState(false);
    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);


    // On component mount, retrieve the units from local storage
    useEffect(() => {
        const storedUnits = localStorage.getItem('units');
        if (storedUnits) {
            const parsedUnits: Unit[] = JSON.parse(storedUnits);
            parsedUnits.forEach((unit) => {
                addUnit(unit);
            })
        }
    }, []);

    // Save the units to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('units', JSON.stringify(units));
    }, [units]);

    const totalPoints = units.reduce((sum, unit) => sum + (unit.MyCalculatedPointValue || unit.BFPointValue), 0);

    const addUnit = (unit: Unit) => {
        setLastId(prevLastId => {
            const newId = prevLastId + 1;

            const newUnit = { ...unit, MyId: newId };

            setUnits(prevUnits => [...prevUnits, newUnit]);
            setIsNameListPanelOpen(false);

            return newId;
        });
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

    const showConfirmDialog = () => {
        setIsConfirmDialogVisible(true);
    };

    const hideConfirmDialog = () => {
        setIsConfirmDialogVisible(false);
    };

    const resetUnits = () => {
        setUnits([]);
        hideConfirmDialog();
    };



    const openPanel = () => setIsNameListPanelOpen(true);

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>
                Alpha Strike PV:&nbsp;
                <span style={{ color: 'darkred' }}>
                    {totalPoints}
                </span>
            </h1>
            <div className="cardsGrid">
                {units.map((unit) => (
                    <div className='cardContainer' key={unit.MyId}>
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

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40, marginBottom: 40 }}>
                <DefaultButton
                    onClick={openPanel}
                    style={{
                        width: units.length > 0 ? 140 : 340,
                        marginRight: units.length > 0 ? 10 : 0 // Only add margin if Reset button will be shown
                    }}
                >
                    Add a unit
                </DefaultButton>

                <DefaultButton
                    onClick={showConfirmDialog}
                    style={{
                        backgroundColor: 'darkred',
                        color: 'white',
                        marginLeft: 10, // space between the buttons
                        width: 140,
                        display: units.length === 0 ? 'none' : 'inline-block' // Using display to hide/show ensures correct spacing
                    }}
                >
                    Reset
                </DefaultButton>
            </div>

            <Panel isOpen={isNameListPanelOpen} onDismiss={() => setIsNameListPanelOpen(false)} headerText="Add Unit">
                <NameList onAddUnit={addUnit} />
            </Panel>
            <Dialog
                hidden={!isConfirmDialogVisible}
                onDismiss={hideConfirmDialog}
                dialogContentProps={{
                    title: 'Reset Units',
                    subText: 'Are you sure you want to empty the unit list? This action is irreversible.'
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 450 } }
                }}
            >
                <DialogFooter>
                    <PrimaryButton onClick={resetUnits} text="Yes" />
                    <DefaultButton onClick={hideConfirmDialog} text="No" />
                </DialogFooter>
            </Dialog>

        </div>
    );
};

export default MyUnits;
