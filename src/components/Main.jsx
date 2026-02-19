import { useRef, useEffect } from "react";
import Preloader from "./Preloader";
import SearchResults from "./SearchResults";
import About from "./About";

import "../blocks/Main.css";

function Main({
  isLoading,
  showPreloader,
  handleLoadMore,
  searchresults,
  hasMore,
  hasSearched,
  handleTryAgainClick,
  handleCardBookmark,
  bookmarkedEvents,
  searchError,
}) {
  const resultsRef = useRef(null);

  useEffect(() => {
    if (hasSearched && !isLoading && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [hasSearched, isLoading]);

  return (
    <main className="content">
      {isLoading && showPreloader ? (
        <Preloader isLoading={isLoading} />
      ) : (
        <section ref={resultsRef} className="search-results">
          <SearchResults
            events={searchresults}
            hasSearched={hasSearched}
            handleTryAgainClick={handleTryAgainClick}
            handleCardBookmark={handleCardBookmark}
            bookmarkedEvents={bookmarkedEvents}
            searchError={searchError}
          />
          {hasMore && (
            <button
              className="results__button"
              type="button"
              onClick={handleLoadMore}
            >
              Show more
            </button>
          )}
        </section>
      )}

      <section>
        <About />
      </section>
    </main>
  );
}

export default Main;
