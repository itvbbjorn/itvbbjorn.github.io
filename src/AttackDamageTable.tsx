import React from 'react';

interface AttackDamageTableProps {
    unit: Unit;
}

const AttackDamageTable: React.FC<AttackDamageTableProps> = ({ unit }) => {
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
                    <td style={{ minWidth: 50, maxWidth: 100, color: 'darkred', fontWeight: 'bold', fontSize: 20 }}>{unit.BFDamageShort}</td>
                    <td style={{ minWidth: 50, maxWidth: 100, color: 'darkred', fontWeight: 'bold', fontSize: 20 }}>{unit.BFDamageMedium}</td>
                    <td style={{ minWidth: 50, maxWidth: 100, color: 'darkred', fontWeight: 'bold', fontSize: 20 }}>{unit.BFDamageLong}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default AttackDamageTable;
