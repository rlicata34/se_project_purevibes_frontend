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
}) {
  return (
    <main className="content">
      {isLoading && showPreloader ? (
        <Preloader isLoading={isLoading} />
      ) : (
        <section className="results">
          <SearchResults
            events={searchresults}
            hasSearched={hasSearched}
            handleTryAgainClick={handleTryAgainClick}
            handleCardBookmark={handleCardBookmark}
            bookmarkedEvents={bookmarkedEvents}
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
