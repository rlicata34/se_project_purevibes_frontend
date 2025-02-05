import { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import ModalWithForm from "./ModalWithForm";

import "../blocks/SearchModal.css";

function SearchModal({
  onClose,
  isOpen,
  activeModal,
  fetchAndSetSearchResults,
}) {
  const {
    values,
    handleChange,
    isValid,
    setValues,
    setErrors,
    resetForm,
    setIsValid,
  } = useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      setValues({
        genre: "",
        artist: "",
        stateCode: "",
        startDate: "",
        endDate: "",
      });
      setErrors({ message: "" });
      setIsValid(false);
    }
  }, [isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (isValid) {
      fetchAndSetSearchResults(values);
      resetForm();
    }
  };

  return (
    <ModalWithForm
      name="search-modal"
      title="Discover Events"
      isOpen={isOpen}
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonClass={`modal__submit-button ${
        isValid ? "modal__submit-button_active" : ""
      }`}
      buttonText="Search"
    >
      <label className="modal__label">
        Genre
        <input
          type="text"
          className="modal__input"
          name="genre"
          value={values.genre || ""}
          placeholder="Genre"
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Artist
        <input
          type="text"
          className="modal__input"
          name="artist"
          value={values.artist || ""}
          placeholder="Artist"
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        State
        <input
          type="text"
          className="modal__input"
          name="stateCode"
          value={values.stateCode || ""}
          placeholder="e.g. NY for New York"
          maxLength={2}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Start Date
        <input
          type="date"
          className="modal__input"
          name="startDate"
          value={values.startDate || ""}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        End Date
        <input
          type="date"
          className="modal__input"
          name="endDate"
          value={values.endDate || ""}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default SearchModal;
