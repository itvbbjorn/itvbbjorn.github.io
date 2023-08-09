import React from 'react';

interface AttackDamageTableProps {
    unit: Unit;
}

const AttackDamageTable: React.FC<AttackDamageTableProps> = ({ unit }) => {
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead style={{ backgroundColor: 'black', color: 'white' }}>
                <tr>
                    <th style={{ minWidth: 50, maxWidth: 100 }}>S (+0)</th>
                    <th style={{ minWidth: 50, maxWidth: 100 }}>M (+2)</th>
                    <th style={{ minWidth: 50, maxWidth: 100 }}>L (+4)</th>
                </tr>
            </thead>
            <tbody style={{ backgroundColor: 'lightgray' }}>
                <tr>
                    <td style={{ minWidth: 50, maxWidth: 100, color: 'red', fontWeight: 'bold' }}>{unit.BFDamageShort}</td>
                    <td style={{ minWidth: 50, maxWidth: 100, color: 'red', fontWeight: 'bold' }}>{unit.BFDamageMedium}</td>
                    <td style={{ minWidth: 50, maxWidth: 100, color: 'red', fontWeight: 'bold' }}>{unit.BFDamageLong}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default AttackDamageTable;
