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
import MenuModal from "./MenuModal";
import ProtectedRoute from "./ProtectedRoute";
import { authorize, checkToken, register } from "../utils/auth";
import {
  getBookmarkedEvents,
  bookmarkEvent,
  removeBookmarkEvent,
} from "../utils/api";
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
  const [searchError, setSearchError] = useState(null);
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

  useEffect(() => {
    getBookmarkedEvents()
      .then((eventsData) => {
        setBookmarkedEvents(eventsData);
      })
      .catch((err) => {
        console.error("Error fetching bookmarked events:", err);
      });
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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    clearCurrentUser();
    setSearchResults([]);
    setHasSearched(false);
    console.log("User logged out successfully");
  };

  const handleMenuClick = () => {
    setActiveModal("menu-modal");
  };

  /* ---------------------------------- API interactions ------------------------------- */

  const handleCardBookmark = (event) => {
    const isBookmarked = bookmarkedEvents.some((evt) => evt.url === event.url);

    if (isBookmarked) {
      removeBookmarkEvent(event)
        .then((event) => {
          setBookmarkedEvents((prev) =>
            prev.filter((evt) => evt.url !== event.url)
          );
        })
        .catch((err) => {
          console.error("Error removing event", err);
        });
    } else {
      bookmarkEvent(event)
        .then((updatedEvent) => {
          setBookmarkedEvents((prev) => [...prev, updatedEvent]);
        })
        .catch((err) => {
          console.error("Error bookmarking event", err);
        });
    }
  };

  const fetchAndSetSearchResults = (searchParams) => {
    setIsLoading(true);
    setShowPreloader(true);
    setSearchResults([]);
    setSearchError(null);
    setHasSearched(true);
    closeModal();

    console.log("Sending search request with params:", searchParams);

    getEvents(searchParams)
      .then((eventsData) => {
        console.log("Received raw events data:", eventsData);

        const filteredEvents = filterEventsData(eventsData);
        console.log("Filtered events:", filteredEvents);

        setSearchResults(filteredEvents);
        setResultsToShow(3);
      })
      .catch((err) => {
        console.error("Error fetching events", err);
        setSearchError(
          "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."
        );
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
          setShowPreloader(false);
        }, 1000);
      });
  };

  const handleRegister = (email, password, username, avatar) => {
    if (!email || !password || !username || !avatar) {
      console.error("All fields are required!");
      return;
    }

    register(email, password, username, avatar)
      .then((data) => {
        console.log("Registration response:", data);

        if (data.token) {
          localStorage.setItem("authToken", data.token);
          setIsLoggedIn(true);
          setCurrentUser(data.user);
          closeModal();
          console.log("Auth token stored successfully:", data.token);
        } else {
          console.error("No token received in response:", data);
        }
      })
      .catch((err) => {
        console.error("Error during registration:", err);
      });
  };

  const handleLogin = (email, password) => {
    if (!email || !password) {
      console.error("Missing email or password");
      return;
    }

    authorize(email, password)
      .then((data) => {
        console.log("Login response:", data);

        if (data.token) {
          localStorage.setItem("authToken", data.token);
          setIsLoggedIn(true);
          setCurrentUser(data.user); //
          closeModal();
          console.log("Auth token stored successfully:", data.token);
        } else {
          console.error("No token received in response:", data);
        }
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
                    handleMenuClick={handleMenuClick}
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
                    searchError={searchError}
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
                  handleMenuClick={handleMenuClick}
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
                    handleMenuClick={handleMenuClick}
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
        <MenuModal
          onClose={closeModal}
          isOpen={activeModal === "menu-modal"}
          isLoggedIn={isLoggedIn}
          activeModal={activeModal}
          handleLoginClick={handleLoginClick}
          handleLogout={handleLogout}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
