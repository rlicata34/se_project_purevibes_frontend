import ModalWithForm from "./ModalWithForm";

import "../blocks/SearchModal.css";

function SearchModal({ onClose, isOpen, activeModal }) {
  return (
    <ModalWithForm
      title="Discover Events"
      isOpen={isOpen}
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonClass={`modal__submit-button-discover ${
        isButtonActive ? "modal__submit-button_active" : ""
      }`}
    >
      <label className="form__label">
        Artist
        <input
          type="text"
          className="form__input"
          name="artist"
          placeholder="artist"
        />
      </label>
      <label className="form__label">
        City
        <input
          type="text"
          className="form__input"
          name="city"
          placeholder="city"
        />
      </label>
      <label className="form__label">
        Start Date
        <input type="date" className="form__input" name="startDate" />
      </label>
      <label className="form__label">
        End Date
        <input type="date" className="form__input" name="endDate" />
      </label>
    </ModalWithForm>
  );
}

export default SearchModal;
