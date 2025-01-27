import { Link } from "react-router-dom";

import "../blocks/Navigation.css";

import logo from "../assets/purevibes-logo-white.png";
import avatar from "../assets/avatar.jpg";

function Navigation({ handleLoginClick, handleRegisterClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <nav className="nav">
      <Link to="/">
        <img src={logo} alt="logo" className="nav__logo" />
      </Link>
      <p className="nav__date">{currentDate}</p>
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
      <Link to="/" className="nav__link">
        Home
      </Link>
      <Link to="/about" className="nav__link">
        About
      </Link>
      <Link to="/profile" className="nav__profile-link">
        <p className="nav__name">Ryan Licata</p>
        <img src={avatar} alt="avatar" className="nav__avatar" />
      </Link>
    </nav>
  );
}

export default Navigation;
