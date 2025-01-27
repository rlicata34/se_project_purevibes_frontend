import Preloader from "./Preloader";
import SearchResults from "./SearchResults";
import About from "./About";

import "../blocks/Main.css";

function Main({ isLoading, handleLoadMore, searchresults, hasMore }) {
  return (
    <main className="content">
      {isLoading ? (
        <Preloader isLoading={isLoading} />
      ) : (
        <section className="results">
          <SearchResults events={searchresults} />
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
