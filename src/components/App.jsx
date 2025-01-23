// import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import About from "./About";
import Profile from "./Profile";
import Footer from "./Footer";
import WithNavigation from "./WithNavigation";

import "../blocks/App.css";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Main />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <WithNavigation>
                <About />
              </WithNavigation>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
