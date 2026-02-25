import Navigation from "./Navigation";
import "../blocks/Header.css";

function Header({
  handleDiscoverClick,
  handleLoginClick,
  handleRegisterClick,
  isLoggedIn,
  handleLogout,
  handleMenuClick,
}) {
  return (
    <header className="header">
      <Navigation
        handleLoginClick={handleLoginClick}
        handleRegisterClick={handleRegisterClick}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        handleMenuClick={handleMenuClick}
      />
      <div className="header__body">
        <div className="header__container">
          <h1 className="header__title">
            Feel the Energy.
            <span className="header__title-span">Live the Moment.</span>
          </h1>
          <p className="header__text">
            Discover concerts, festivals, and experiences
            <span className="header__text-span">
              that turn nights into lifelong memories.
            </span>
          </p>
          <button
            type="button"
            className="header__form-button"
            onClick={handleDiscoverClick}
          >
            Discover Events
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
