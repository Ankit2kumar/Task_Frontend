import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./components/Home";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
    </Routes>
  );
}

export default App;
