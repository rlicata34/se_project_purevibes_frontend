import Preloader from "./Preloader";
import About from "./About";

import "../blocks/Main.css";

function Main({ isLoading }) {
  return (
    <main className="content">
      <Preloader isLoading={isLoading} />
      <section></section>
      <section>
        <About />
      </section>
    </main>
  );
}

export default Main;
