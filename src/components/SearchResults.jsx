import EventCard from "./EventCard";
import notFoundIcon from "../assets/no-results-icon.svg";
import serverErrorIcon from "../assets/server-error-icon.svg";
import "../blocks/SearchResults.css";

function SearchResults({
  events,
  hasSearched,
  handleTryAgainClick,
  handleCardBookmark,
  bookmarkedEvents,
  searchError,
}) {
  if (!hasSearched) {
    return null;
  }

  if (searchError) {
    return (
      <div className="results__error">
        <img
          src={serverErrorIcon}
          alt="Server error icon"
          className="results__error-icon"
        />
        <h2 className="results__error-title">{searchError}</h2>
        <button
          className="results__error-button"
          type="button"
          onClick={handleTryAgainClick}
        >
          Try again
        </button>
      </div>
    );
  }
  return events.length > 0 ? (
    <div className="results">
      <h2 className="results__title">Search results</h2>
      <ul className="cards__list">
        {events.map((event) => {
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
    </div>
  ) : (
    <div className="results-not-found">
      <img
        src={notFoundIcon}
        alt="Not found icon"
        className="results-not-found__image"
      />
      <h2 className="results-not-found__title">
        {"We're Sorry. No events match your search."}
      </h2>
      <button
        className="results-not-found__button"
        type="button"
        onClick={handleTryAgainClick}
      >
        Try again
      </button>
    </div>
  );
}

export default SearchResults;
