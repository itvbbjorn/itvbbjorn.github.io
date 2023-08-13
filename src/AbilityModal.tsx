import React from 'react';
import { Modal, IconButton } from '@fluentui/react';
import { RulesReference } from './Models/RulesReference';
import RulesReferences from './RulesReferences'; // Adjust path if needed


interface AbilityModalProps {
    ability: string | null;
    isOpen: boolean;
    onClose: () => void;
}

const findRuleByAbbreviation = (abbreviation: string): RulesReference | undefined => {
    return RulesReferences.find(rule => {
        const regexPattern = rule.abbreviation.replace(/#/g, "\\d+"); // Replace # with \d+ (regex for any digit, one or more times)
        const regex = new RegExp(`^${regexPattern}$`, 'i'); // Create regex pattern
        return regex.test(abbreviation);
    });
};


const AbilityModal: React.FC<AbilityModalProps> = ({ ability, isOpen, onClose }) => {
    const rule = findRuleByAbbreviation(ability || "");

    return (
        <Modal
            isOpen={isOpen}
            onDismiss={onClose}
            containerClassName="ms-modal-container"
        >
            <div style={{ position: 'relative', padding: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold' }}>{rule ? rule.name : "Ability not found"}</span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {rule && <span style={{ marginRight: 10,  }}>p. {rule.pageNumber}</span>}
                        <IconButton
                            className="ms-modal-closeButton"
                            iconProps={{ iconName: 'Cancel' }}
                            ariaLabel="Close popup modal"
                            onClick={onClose}
                        />
                    </div>
                </div>
                <div className="ms-modal-body" style={{  }}>
                    {rule ? (
                        <div>
                            {rule.rule}
                        </div>
                    ) : (
                        <div>Ability details not available. Optional rules are not yet implemented.</div>
                    )}
                </div>
            </div>
        </Modal>


    );
};



export default AbilityModal;
