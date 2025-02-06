import Navigation from "./Navigation";
import EventCard from "./EventCard";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

import "../blocks/Profile.css";

function Profile({
  bookmarkedEvents,
  handleCardBookmark,
  isLoggedIn,
  handleLogout,
  handleMenuClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const savedEventsNumber = bookmarkedEvents.length;
  const singularEvent = "event";
  const pluralEvents = "events";

  return (
    <div className="profile">
      <Navigation
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        handleMenuClick={handleMenuClick}
      />
      <div className="profile__content">
        <h2 className="profile__title">{`${
          currentUser.username
        }, you have ${savedEventsNumber} saved ${
          savedEventsNumber === 1 ? singularEvent : pluralEvents
        }`}</h2>
        {bookmarkedEvents.length > 0 ? (
          <ul className="cards__list">
            {bookmarkedEvents.map((event) => {
              return (
                <EventCard
                  key={event.url}
                  event={event}
                  handleCardBookmark={handleCardBookmark}
                  bookmarkedEvents={bookmarkedEvents}
                />
              );
            })}
          </ul>
        ) : (
          <p className="profile__text">No bookmarked events yet.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
