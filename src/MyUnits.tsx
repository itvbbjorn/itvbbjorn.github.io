import React, { useState, useEffect } from 'react';
import { DefaultButton, Panel, Dialog, DialogFooter, PrimaryButton, Toggle } from '@fluentui/react';
import NameList from './NameList';
import MyUnitCard from './MyUnitCard';
import './Styles-MyUnits.css';
import { Unit } from './Models/Unit';

const MyUnits: React.FC = () => {
    const [units, setUnits] = useState<Unit[]>([]);
    const [, setLastId] = useState(0);
    const [isNameListPanelOpen, setIsNameListPanelOpen] = useState(false);
    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
    const [useHexes, setUseHexes] = useState<boolean>(() => {
        const storedHexSetting = localStorage.getItem('useHexes');
        return storedHexSetting ? JSON.parse(storedHexSetting) : false;
    });

    // On component mount, retrieve the units from local storage
    useEffect(() => {
        const storedUnits = localStorage.getItem('units');
        if (storedUnits) {
            const parsedUnits: Unit[] = JSON.parse(storedUnits);
            parsedUnits.forEach((unit) => {
                addUnit(unit);
            })
        }

        const storedHexSetting = localStorage.getItem('useHexes');
        if (storedHexSetting) {
            const parsedHexes: boolean = JSON.parse(storedHexSetting);
            setUseHexes(parsedHexes);
        }
    }, []); 

    useEffect(() => {
        localStorage.setItem('units', JSON.stringify(units));
        localStorage.setItem('useHexes', JSON.stringify(useHexes));
    }, [units, useHexes]);

    const totalPoints = units.reduce((sum, unit) => sum + (unit.MyCalculatedPointValue || unit.BFPointValue), 0);

    const toggleUseHexes = (_: any, checked?: boolean) => {
        setUseHexes(!!checked);
    };


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
                            useHexes={useHexes}
                        />
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 40, marginBottom: 10, marginRight: 10, marginLeft: 10 }}>
                <DefaultButton
                    onClick={openPanel}
                    style={{
                        width: units.length > 0 ? 140 : 340,
                        marginRight: units.length > 0 ? 10 : 0
                    }}
                >
                    Add a unit
                </DefaultButton>

                <DefaultButton
                    onClick={showConfirmDialog}
                    style={{
                        backgroundColor: 'darkred',
                        color: 'white',
                        marginLeft: 10,
                        width: 140,
                        display: units.length === 0 ? 'none' : 'inline-block'
                    }}
                >
                    Reset
                </DefaultButton>

                
            </div>
            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: 100 }}>
                    <Toggle
                        checked={useHexes}
                        onChange={toggleUseHexes}
                        onText="Hexes"
                        offText="Inches"
                        styles={{ root: { margin: '20px 0', width: '100%' } }}
                    />
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
