import React from 'react';
import '../Components/styles/Dialog.css'; 

function Dialog({ message, onClose }) {
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <p>{message}</p>
        <button onClick={onClose} className="dialog-button">Close</button>
      </div>
    </div>
  );
}

export default Dialog;
