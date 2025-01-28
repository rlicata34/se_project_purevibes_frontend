import EventCard from "./EventCard";
import notFoundIcon from "../assets/not-found-icon.svg";
import "../blocks/SearchResults.css";

function SearchResults({ events, hasSearched, handleTryAgainClick }) {
  if (!hasSearched) {
    return null;
  }
  return events.length > 0 ? (
    <div className="results">
      <h2 className="results__title">Search results</h2>
      <ul className="cards__list">
        {events.map((event) => {
          return <EventCard key={event.url} event={event} />;
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
        We're Sorry. No events match your search.
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
