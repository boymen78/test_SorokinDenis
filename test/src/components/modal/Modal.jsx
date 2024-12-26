import React from "react";

const Modal = ({ message, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <p>{message}</p>
                <button onClick={onClose} className="closeButton">
                    Закрыть
                </button>
            </div>
        </div>
    );
};

export default Modal;