import EventCard from "./EventCard";

import "../blocks/SearchResults.css";

function SearchResults() {
  return (
    <div className="results">
      <h2 className="results__title">Search results</h2>
      <ul className="cards__list">
        <EventCard />
      </ul>
      <button className="results__button" type="button">
        Show more
      </button>
    </div>
  );
}

export default SearchResults;
