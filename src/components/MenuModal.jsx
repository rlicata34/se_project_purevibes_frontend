import { Link } from "react-router-dom";
import { useContext } from "react";

import Modal from "./Modal";
import logo from "../assets/purevibes-logo-2.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import "../blocks/MenuModal.css";

function MenuModal({
  onClose,
  isOpen,
  isLoggedIn,
  activeModal,
  handleLoginClick,
  handleLogout,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleSubmitLogout = (evt) => {
    evt.preventDefault();
    handleLogout();
    onClose();
  };

  const handleSubmitLogin = (evt) => {
    evt.preventDefault();
    handleLoginClick();
  };

  return (
    activeModal && (
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        name="menu"
        activeModal={activeModal}
      >
        <Link to="/">
          <img src={logo} alt="logo" className="menu__logo" />
        </Link>
        <span className="menu__border"></span>
        {isLoggedIn ? (
          <div className="menu__container">
            <Link to="/" className="menu__link">
              Home
            </Link>
            <Link to="/about" className="menu__link">
              About
            </Link>
            <Link to="/profile" className="menu__profile-link">
              <p className="menu__name">{currentUser.username}</p>
            </Link>
          </div>
        ) : (
          <div className="menu__container">
            <Link to="/" className="menu__link">
              Home
            </Link>
            <Link to="/about" className="menu__link">
              About
            </Link>
          </div>
        )}
        {isLoggedIn ? (
          <button
            className="menu__button"
            type="button"
            onClick={handleSubmitLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="menu__button"
            type="button"
            onClick={handleSubmitLogin}
          >
            Sign in
          </button>
        )}
      </Modal>
    )
  );
}

export default MenuModal;
