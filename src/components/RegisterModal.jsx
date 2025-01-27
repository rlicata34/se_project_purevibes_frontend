import { useState } from "react";

import { useForm } from "../hooks/useForm";
import ModalWithForm from "./ModalWithForm";

import "../blocks/RegisterModal.css";

function RegisterModal({ onClose, isOpen, activeModal, handleLoginClick }) {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    username: "",
    avatar: "",
  });

  const handleSubmit = () => {};
  return (
    <ModalWithForm
      name="register-modal"
      title="Sign up"
      isOpen={isOpen}
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonClass={`modal__submit-button-register ${
        isButtonActive ? "modal__submit-button_active" : ""
      }`}
      buttonText="Sign Up"
    >
      <label className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          name="email"
          value={values.email}
          placeholder="Email"
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          name="password"
          value={values.city}
          placeholder="Password"
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Username*{" "}
        <input
          type="text"
          className="modal__input"
          name="username"
          value={values.username}
          placeholder="Username"
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Avatar URL*{" "}
        <input
          type="url"
          className="modal__input"
          name="avatar"
          value={values.avatar}
          placeholder="Avatar URL"
          onChange={handleChange}
        />
      </label>
      <button
        className="register-modal__button"
        type="button"
        onClick={handleLoginClick}
      >
        or Sign In
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
