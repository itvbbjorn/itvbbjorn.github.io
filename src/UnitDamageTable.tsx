import React from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from '@fluentui/react';

interface UnitDamageTableProps {
    unit: Unit;
}

const UnitDamageTable: React.FC<UnitDamageTableProps> = ({ unit }) => {
    const columns: IColumn[] = [
        { key: 'S', name: 'S (+0)', fieldName: 'S', minWidth: 50, maxWidth: 100 },
        { key: 'M', name: 'M (+2)', fieldName: 'M', minWidth: 50, maxWidth: 100 },
        { key: 'L', name: 'L (+4)', fieldName: 'L', minWidth: 50, maxWidth: 100 },
    ];

    const data = [
        {
            key: '1',
            S: unit.BFDamageShort.toString(),
            M: unit.BFDamageMedium.toString(),
            L: unit.BFDamageLong.toString(),
        },
    ];

    return (
        <DetailsList
            items={data}
            columns={columns}
            selectionMode={SelectionMode.none}
            onRenderDetailsHeader={props => (
                <div
                    style={{
                        backgroundColor: 'black',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <div style={{ width: props!.columns[0].calculatedWidth! }}>S (+0)</div>
                    <div style={{ width: props!.columns[1].calculatedWidth! }}>M (+2)</div>
                    <div style={{ width: props!.columns[2].calculatedWidth! }}>L (+4)</div>
                </div>
            )}
        />
    );
};

export default UnitDamageTable;
