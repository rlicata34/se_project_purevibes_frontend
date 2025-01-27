import EventCard from "./EventCard";

import "../blocks/SearchResults.css";

function SearchResults({ events }) {
  return (
    <div className="results">
      <h2 className="results__title">Search results</h2>
      <ul className="cards__list">
        {events.length > 0
          ? events.map((event) => {
              return <EventCard key={event.url} event={event} />;
            })
          : []}
      </ul>
    </div>
  );
}

export default SearchResults;
