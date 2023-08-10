import React from 'react';
import { Unit } from './Models/Unit';

interface AttackDamageTableProps {
    unit: Unit;
}

const calculateAdjustedDamage = (baseDamage: number, weaponHits: number) => {
    return Math.max(0, baseDamage - weaponHits);
};

const AttackDamageTable: React.FC<AttackDamageTableProps> = ({ unit }) => {
    const weaponHits = unit.MyWeaponHits ?? 0;

    const adjustedShort = calculateAdjustedDamage(unit.BFDamageShort, weaponHits);
    const adjustedMedium = calculateAdjustedDamage(unit.BFDamageMedium, weaponHits);
    const adjustedLong = calculateAdjustedDamage(unit.BFDamageLong, weaponHits);

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', border: 'solid black', marginBottom: 5 }}>
            <thead style={{ backgroundColor: 'black', color: 'white', borderRadius: 10 }}>
                <tr>
                    <th style={{ minWidth: 50, maxWidth: 100 }}>S (+0)</th>
                    <th style={{ minWidth: 50, maxWidth: 100 }}>M (+2)</th>
                    <th style={{ minWidth: 50, maxWidth: 100 }}>L (+4)</th>
                </tr>
            </thead>
            <tbody style={{ backgroundColor: 'lightgray' }}>
                <tr>
                    <td style={{ minWidth: 50, maxWidth: 100, color: 'darkred', fontWeight: 'bold', fontSize: 20 }}>{adjustedShort}</td>
                    <td style={{ minWidth: 50, maxWidth: 100, color: 'darkred', fontWeight: 'bold', fontSize: 20 }}>{adjustedMedium}</td>
                    <td style={{ minWidth: 50, maxWidth: 100, color: 'darkred', fontWeight: 'bold', fontSize: 20 }}>{adjustedLong}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default AttackDamageTable;
