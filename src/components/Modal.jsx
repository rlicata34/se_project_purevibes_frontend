import { useEffect } from "react";

import "../blocks/Modal.css";

function Modal({ isOpen, name, onClose, children, activeModal }) {
  useEffect(() => {
    const handleEscape = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    activeModal && (
      <div
        className={`modal-${name} ${isOpen ? "modal_opened" : ""}`}
        onClick={handleOverlay}
      >
        <div className={`modal-${name}__content`}>
          {children}
          <button className={`modal-${name}__close`} onClick={onClose} />
        </div>
      </div>
    )
  );
}

export default Modal;
