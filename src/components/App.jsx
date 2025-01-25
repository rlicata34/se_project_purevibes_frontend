import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import About from "./About";
import Profile from "./Profile";
import Footer from "./Footer";
import WithNavigation from "./WithNavigation";
import SearchModal from "./SearchModal";

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

  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header handleDiscoverClick={handleDiscoverClick} />
                <Main isLoading={isLoading} />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <WithNavigation>
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
    </div>
  );
}

export default App;
