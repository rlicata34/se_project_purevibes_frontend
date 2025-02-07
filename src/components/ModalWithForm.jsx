import Modal from "./Modal";

import "../blocks/ModalWithForm.css";

function ModalWithForm({
  name,
  onClose,
  title,
  onSubmit,
  children,
  activeModal,
  isOpen,
  buttonClass,
  buttonText,
}) {
  return (
    activeModal && (
      <Modal
        name={name}
        onClose={onClose}
        activeModal={activeModal}
        isOpen={isOpen}
      >
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className={buttonClass}>
            {buttonText}
          </button>
        </form>
      </Modal>
    )
  );
}

export default ModalWithForm;
