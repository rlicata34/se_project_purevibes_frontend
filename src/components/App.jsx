import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import About from "./About";
import Profile from "./Profile";
import Footer from "./Footer";
import WithNavigation from "./WithNavigation";
import SearchModal from "./SearchModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

import "../blocks/App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    setActiveModal("");
  };

  const handleDiscoverClick = () => {
    setActiveModal("search-form");
  };

  const handleLoginClick = () => {
    setActiveModal("login-form");
  };

  const handleRegisterClick = () => {
    setActiveModal("register-form");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  handleDiscoverClick={handleDiscoverClick}
                  handleLoginClick={handleLoginClick}
                  handleRegisterClick={handleRegisterClick}
                />
                <Main isLoading={isLoading} />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <WithNavigation
                handleLoginClick={handleLoginClick}
                handleRegisterClick={handleRegisterClick}
              >
                <About />
              </WithNavigation>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
      <SearchModal
        onClose={onClose}
        activeModal={activeModal}
        isOpen={activeModal === "search-form"}
      />
      <LoginModal
        onClose={onClose}
        activeModal={activeModal}
        isOpen={activeModal === "login-form"}
      />
      <RegisterModal
        onClose={onClose}
        activeModal={activeModal}
        isOpen={activeModal === "register-form"}
      />
    </div>
  );
}

export default App;
