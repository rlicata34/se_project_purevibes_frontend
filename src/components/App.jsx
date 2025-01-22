// import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
// import Main from "./Main";
import About from "./About";
import Profile from "./Profile";

import "../blocks/App.css";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
