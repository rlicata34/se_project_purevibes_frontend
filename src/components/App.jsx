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
import { APIKey } from "../utils/constants";
import { getEvents, filterEventsData } from "../utils/ticketmasterApi";

import "../blocks/App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false); // State for controlling preloader
  const [searchresults, setSearchResults] = useState([]);
  const [resultsToShow, setResultsToShow] = useState(3); // Number of results to show

  const closeModal = () => {
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

  const fetchAndSetSearchResults = (searchParams) => {
    setIsLoading(true);
    setShowPreloader(true);
    setSearchResults([]);
    getEvents(APIKey, searchParams)
      .then((eventsData) => {
        const filteredEvents = filterEventsData(eventsData);
        setSearchResults(filteredEvents);
        console.log(searchresults);
        setResultsToShow(3);
      })
      .catch((err) => {
        console.error("Error fetching events", err);
      })
      .finally(() => {
        // Set a timeout to show the preloader for 2 seconds before displaying results
        setTimeout(() => {
          setIsLoading(false); // Hide the loader
          setShowPreloader(false); // Stop showing the preloader
        }, 1000);
        closeModal();
      });
  };

  const handleLoadMore = () => {
    setResultsToShow((prev) => prev + 3); // Increment results to show by 3
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
                <Main
                  isLoading={isLoading}
                  showPreloader={showPreloader}
                  searchresults={searchresults.slice(0, resultsToShow)}
                  handleLoadMore={handleLoadMore}
                  hasMore={resultsToShow < searchresults.length}
                  handleTryAgainClick={handleDiscoverClick}
                />
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
        onClose={closeModal}
        activeModal={activeModal}
        isOpen={activeModal === "search-form"}
        fetchAndSetSearchResults={fetchAndSetSearchResults}
      />
      <LoginModal
        onClose={closeModal}
        activeModal={activeModal}
        isOpen={activeModal === "login-form"}
        handleRegisterClick={handleRegisterClick}
      />
      <RegisterModal
        onClose={closeModal}
        activeModal={activeModal}
        isOpen={activeModal === "register-form"}
        handleLoginClick={handleLoginClick}
      />
    </div>
  );
}

export default App;
