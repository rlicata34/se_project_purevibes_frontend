import { useState, useEffect } from "react";
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
import ProtectedRoute from "./ProtectedRoute";
import { APIKey } from "../utils/constants";
import { authorize, checkToken, register } from "../utils/auth";
import { getEvents, filterEventsData } from "../utils/ticketmasterApi";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import "../blocks/App.css";

function App() {
  /* ------------------------------- App states --------------------------------------- */

  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [searchresults, setSearchResults] = useState([]);
  const [resultsToShow, setResultsToShow] = useState(3);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    username: "",
    email: "",
    avatar: "",
  });

  /* --------------------------------- useEffect functions ---------------------------- */

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          localStorage.removeItem("authToken");
        });
    }
  }, []);

  /* --------------------------------- Handlers/functions ----------------------------- */

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

  const handleLoadMore = () => {
    setResultsToShow((prev) => prev + 3);
  };

  const handleCardBookmark = (event) => {
    setBookmarkedEvents((prev) => {
      // Check if the event is already bookmarked
      const isAlreadyBookmarked = prev.some((evt) => evt.id === event.id);
      if (isAlreadyBookmarked) {
        // Remove the event from bookmarks
        return prev.filter((evt) => evt.id !== event.id);
      } else {
        // Add the event to bookmarks
        console.log(event);
        return [...prev, event];
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    clearCurrentUser();
    console.log("User logged out successfully");
  };

  /* ---------------------------------- API interactions ------------------------------- */

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
        setTimeout(() => {
          setIsLoading(false);
          setShowPreloader(false);
        }, 1000);
        closeModal();
      });
  };

  const handleRegister = (email, password, username, avatar) => {
    if (!email || !password || !username || !avatar) {
      console.error("All fields are required!");
      return;
    }
    register(email, password)
      .then(() => authorize(email, password))
      .then((data) => {
        console.log("Registration & Login response:", data);

        if (data.token) {
          localStorage.setItem("authToken", data.token); // Store token
          setIsLoggedIn(true);
          setCurrentUser({ username, email, avatar }); // Update user context
          closeModal(); // Close registration modal
        } else {
          console.error("No token received in response:", data);
        }
      })
      .catch((err) => {
        console.error("Error during registration or login:", err);
      });
  };

  const handleLogin = (email, password) => {
    if (!email || !password) {
      console.error("Missing email or password");
      return;
    }
    authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          return checkToken(data.token);
        } else {
          throw new Error("No token in login response.");
        }
      })
      .then(({ data }) => {
        const { username, email, avatar, _id } = data;
        setCurrentUser({ username, email, avatar, _id });
        setIsLoggedIn(true);
        closeModal();
        console.log("Logged in successfully");
      })
      .catch((err) => {
        console.error("Login failed:", err);
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
                    handleLogout={handleLogout}
                  />
                  <Main
                    isLoading={isLoading}
                    showPreloader={showPreloader}
                    searchresults={searchresults.slice(0, resultsToShow)}
                    handleLoadMore={handleLoadMore}
                    hasMore={resultsToShow < searchresults.length}
                    hasSearched={hasSearched}
                    handleTryAgainClick={handleTryAgainClick}
                    handleCardBookmark={handleCardBookmark}
                    bookmarkedEvents={bookmarkedEvents}
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
                  handleLogout={handleLogout}
                >
                  <About />
                </WithNavigation>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    bookmarkedEvents={bookmarkedEvents}
                    handleCardBookmark={handleCardBookmark}
                    isLoggedIn={isLoggedIn}
                    handleLogout={handleLogout}
                  />
                </ProtectedRoute>
              }
            />
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
          handleLogin={handleLogin}
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
