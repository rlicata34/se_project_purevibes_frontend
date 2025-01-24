import Modal from "./Modal";

import "../blocks/ModalWithForm.css";

function ModalWithForm({
  name,
  onClose,
  title,
  onSubmit,
  children,
  buttonClass,
}) {
  return (
    <Modal name={name} onClose={onClose}>
      <h2 className="modal__title">{title}</h2>
      <form className="modal__form" onSubmit={onSubmit}>
        {children}
        <button type="submit" class={buttonClass}></button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
