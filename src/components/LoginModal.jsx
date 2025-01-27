import { useState } from "react";

import { useForm } from "../hooks/useForm";
import ModalWithForm from "./ModalWithForm";

import "../blocks/LoginModal.css";

function LoginModal({ onClose, isOpen, activeModal, handleRegisterClick }) {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = () => {};
  return (
    <ModalWithForm
      name="login-modal"
      title="Sign In"
      isOpen={isOpen}
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonClass={`modal__submit-button-login ${
        isButtonActive ? "modal__submit-button_active" : ""
      }`}
      buttonText="Log In"
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
      <button
        className="login-modal__button"
        type="button"
        onClick={handleRegisterClick}
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
