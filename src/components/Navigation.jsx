import { Link } from "react-router-dom";
import { useContext } from "react";

import "../blocks/Navigation.css";

import logo from "../assets/purevibes-logo-white.png";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Navigation({
  handleLoginClick,
  handleRegisterClick,
  isLoggedIn,
  handleLogout,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogout();
  };

  return (
    <nav className="nav">
      <Link to="/">
        <img src={logo} alt="logo" className="nav__logo" />
      </Link>
      <p className="nav__date">{currentDate}</p>
      <Link to="/" className="nav__link">
        Home
      </Link>
      <Link to="/about" className="nav__link">
        About
      </Link>
      {!isLoggedIn ? (
        <div className="nav__container">
          <button
            className="nav__login-button"
            type="button"
            onClick={handleLoginClick}
          >
            Sign in
          </button>
          <button
            className="nav__register-button"
            type="button"
            onClick={handleRegisterClick}
          >
            Sign up
          </button>
        </div>
      ) : (
        <>
          <Link to="/profile" className="nav__profile-link">
            <p className="nav__name">{currentUser.username}</p>
            <img
              src={currentUser.avatar}
              alt="avatar"
              className="nav__avatar"
            />
          </Link>
          <button
            className="nav__logout-button"
            type="button"
            onClick={handleSubmit}
          ></button>
        </>
      )}
    </nav>
  );
}

export default Navigation;
