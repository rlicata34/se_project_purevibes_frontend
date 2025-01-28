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
import { authorize, checkToken, register } from "../utils/auth";
import { getEvents, filterEventsData } from "../utils/ticketmasterApi";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import "../blocks/App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false); // State for controlling preloader
  const [searchresults, setSearchResults] = useState([]);
  const [resultsToShow, setResultsToShow] = useState(3); // Number of results to show
  const [hasSearched, setHasSearched] = useState(false); // Track if a search has been performed
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    username: "",
    email: "",
    avatar: "",
  });

  console.log(isLoggedIn);

  // const updateCurrentUser = (user) => setCurrentUser(user);
  const clearCurrentUser = () =>
    setCurrentUser({ userName: "", email: "", avatar: "" });

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

  const handleTryAgainClick = () => {
    setActiveModal("search-form");
    setHasSearched(false);
    setSearchResults([]);
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
        setHasSearched(true);
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

  const handleRegister = (email, password, username, avatar) => {
    register(email, password)
      .then((res) => {
        console.log("User registered", res.user);
        setIsLoggedIn(true);
        setCurrentUser({ ...res.user, username, avatar });
        closeModal();
      })
      .catch((err) => {
        console.error("Registration failed", err.message);
      });
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ currentUser, clearCurrentUser }}>
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
                    isLoggedIn={isLoggedIn}
                  />
                  <Main
                    isLoading={isLoading}
                    showPreloader={showPreloader}
                    searchresults={searchresults.slice(0, resultsToShow)}
                    handleLoadMore={handleLoadMore}
                    hasMore={resultsToShow < searchresults.length}
                    hasSearched={hasSearched}
                    handleTryAgainClick={handleTryAgainClick}
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
                  isLoggedIn={isLoggedIn}
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
          handleRegister={handleRegister}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
