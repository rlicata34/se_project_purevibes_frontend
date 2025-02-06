import { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

import ModalWithForm from "./ModalWithForm";

import "../blocks/RegisterModal.css";

function RegisterModal({
  onClose,
  isOpen,
  activeModal,
  handleLoginClick,
  handleRegister,
}) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
    setErrors,
    resetForm,
    setIsValid,
  } = useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "" });
      setErrors({ message: "" });
      setIsValid(false);
    }
  }, [isOpen, setValues, setErrors, setIsValid]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (isValid) {
      handleRegister(
        values.email,
        values.password,
        values.username,
        values.avatar
      );
      resetForm();
    }
  };
  return (
    <ModalWithForm
      name="form"
      title="Sign up"
      isOpen={isOpen}
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonClass={`modal__submit-button ${
        isValid ? "modal__submit-button_active" : ""
      }`}
      buttonText="Sign Up"
    >
      <label className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          name="email"
          value={values.email || ""}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.email}</span>
      </label>
      <label className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          name="password"
          value={values.password || ""}
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.password}</span>
      </label>
      <label className="modal__label">
        Username*{" "}
        <input
          type="text"
          className="modal__input"
          name="username"
          value={values.username || ""}
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.username}</span>
      </label>
      <label className="modal__label">
        Avatar URL*{" "}
        <input
          type="url"
          className="modal__input"
          name="avatar"
          value={values.avatar || ""}
          placeholder="Avatar URL"
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.avatar}</span>
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
