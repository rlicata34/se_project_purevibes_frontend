import ModalWithForm from "./ModalWithForm";
import { useForm } from "../hooks/useForm";

import "../blocks/SearchModal.css";

function SearchModal({ onClose, isOpen, activeModal }) {
  const { values, handleChange, setValues } = useForm({
    artist: "",
    city: "",
    startDate: "",
    endDate: "",
  });
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
          value={values.artist}
          placeholder="artist"
          onChange={handleChange}
        />
      </label>
      <label className="form__label">
        City
        <input
          type="text"
          className="form__input"
          name="city"
          value={values.city}
          placeholder="city"
          onChange={handleChange}
        />
      </label>
      <label className="form__label">
        Start Date
        <input
          type="date"
          className="form__input"
          name="startDate"
          value={values.startDate}
          onChange={handleChange}
        />
      </label>
      <label className="form__label">
        End Date
        <input
          type="date"
          className="form__input"
          name="endDate"
          value={values.endDate}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default SearchModal;
