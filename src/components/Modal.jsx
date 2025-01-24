import { useEffect } from "react";

import "../blocks/Modal.css";

function Modal({ name, onClose, children }) {
  useEffect(() => {
    const handleEscape = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleOverlay = () => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`modal modal_type_${name}`} onClick={handleOverlay}>
      <div className="modal__container">
        {children}
        <button className="modal__close-buttton" onClick={onClose} />
      </div>
    </div>
  );
}

export default Modal;
