import React, { useState, useEffect } from 'react';
import { DefaultButton, Panel } from '@fluentui/react';
import NameList from './NameList';
import MyUnitCard from './MyUnitCard';
import './Styles-MyUnits.css';
import { Unit } from './Models/Unit';

const MyUnits: React.FC = () => {
    const [units, setUnits] = useState<Unit[]>([]);
    const [, setLastId] = useState(0);
    const [isNameListPanelOpen, setIsNameListPanelOpen] = useState(false);

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

    const openPanel = () => setIsNameListPanelOpen(true);

    return (
        <div>
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

            <DefaultButton
                onClick={openPanel}
                style={{
                    width: 340,
                    position: 'relative',
                    bottom: 20,
                    marginTop: 80,
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
                Add a unit
            </DefaultButton>


            <Panel isOpen={isNameListPanelOpen} onDismiss={() => setIsNameListPanelOpen(false)} headerText="Add Unit">
                <NameList onAddUnit={addUnit} />
            </Panel>
        </div>
    );
};

export default MyUnits;
