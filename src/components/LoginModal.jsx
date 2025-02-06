import { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

import ModalWithForm from "./ModalWithForm";
import "../blocks/LoginModal.css";

function LoginModal({
  onClose,
  isOpen,
  activeModal,
  handleRegisterClick,
  handleLogin,
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
  }, [isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      handleLogin(values.email, values.password);
      resetForm();
    }
  };
  return (
    <ModalWithForm
      name="form"
      title="Sign In"
      isOpen={isOpen}
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonClass={`modal__submit-button ${
        isValid ? "modal__submit-button_active" : ""
      }`}
      buttonText="Log In"
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
