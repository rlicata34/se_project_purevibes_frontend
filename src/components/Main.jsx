import Preloader from "./Preloader";
import SearchResults from "./SearchResults";
import About from "./About";

import "../blocks/Main.css";

function Main({ isLoading }) {
  return (
    <main className="content">
      <Preloader isLoading={isLoading} />
      <section>
        <SearchResults />
      </section>
      <section>
        <About />
      </section>
    </main>
  );
}

export default Main;
