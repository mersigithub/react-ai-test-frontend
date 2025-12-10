// src/App.js

import React from "react";

import HomeComponent from "./component/Home";  

function App() {
  return (
    <div>
      {/* Another wrong usage */}
      <Home />   {/* Home is not defined */}
    </div>
  );
}

export default App;
