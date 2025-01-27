import { useForm } from "../hooks/useForm";
import ModalWithForm from "./ModalWithForm";

import "../blocks/LoginModal.css";

function LoginModal({ onClose, isOpen, activeModal }) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = () => {};
  return (
    <ModalWithForm
      name="login-modal"
      title="Sign in"
      isOpen={isOpen}
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
      // buttonClass={`modal__submit-button-discover ${
      //   isButtonActive ? "modal__submit-button_active" : ""
      // }`}
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
    </ModalWithForm>
  );
}

export default LoginModal;
