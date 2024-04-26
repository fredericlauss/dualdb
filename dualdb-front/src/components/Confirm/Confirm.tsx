import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

interface ConfirmModalProps {
    message: string
    onConfirm: () => void
    onCancel: () => void
}

const Confirm = ({ message, onConfirm, onCancel }: ConfirmModalProps) => {
    return (
        <div className="confirm">
            <div className="title">
                <FiAlertTriangle />
                <p>Action irréversible</p>
            </div>
            <p>{message}</p>
            <div className="buttons">
                <button onClick={onCancel} className='animated-link'>
                    Annuler
                </button>
                <button onClick={onConfirm} className='animated filled'>
                    Confirmer
                </button>
            </div>
        </div>
    );
};

export default Confirm;