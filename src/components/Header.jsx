import Navigation from "./Navigation";
import "../blocks/Header.css";

function Header({ handleDiscoverClick }) {
  return (
    <header className="header">
      <div className="header__content">
        <Navigation />
        <h1 className="header__title">Welcome to PureVibes</h1>
        <p className="header__text">
          Lifetime memories are just a few clicks away
        </p>
        <button
          type="button"
          className="header__form-button"
          onClick={handleDiscoverClick}
        >
          Discover
        </button>
      </div>
    </header>
  );
}

export default Header;
