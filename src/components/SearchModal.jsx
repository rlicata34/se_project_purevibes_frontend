import { useState } from "react";

import ModalWithForm from "./ModalWithForm";
import { useForm } from "../hooks/useForm";

import "../blocks/SearchModal.css";

function SearchModal({
  onClose,
  isOpen,
  activeModal,
  fetchAndSetSearchResults,
}) {
  const [isButtonActive, setIsButtonActive] = useState(false);

  const { values, handleChange, setValues } = useForm({
    genre: "",
    artist: "",
    city: "",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetchAndSetSearchResults(values);
  };

  return (
    <ModalWithForm
      name="search-modal"
      title="Discover Events"
      isOpen={isOpen}
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonClass={`modal__submit-button-discover ${
        isButtonActive ? "modal__submit-button_active" : ""
      }`}
      buttonText="Search"
    >
      <label className="modal__label">
        Genre
        <input
          type="text"
          className="modal__input"
          name="genre"
          value={values.genre}
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
          value={values.artist}
          placeholder="Artist"
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        City
        <input
          type="text"
          className="modal__input"
          name="city"
          value={values.city}
          placeholder="City"
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Start Date
        <input
          type="date"
          className="modal__input"
          name="startDate"
          value={values.startDate}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        End Date
        <input
          type="date"
          className="modal__input"
          name="endDate"
          value={values.endDate}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default SearchModal;
