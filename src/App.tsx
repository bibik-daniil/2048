import React from "react";
import "./App.css";
import GameContainer from "./components/GameContainer/GameContainer";
import Menu from "./components/Menu/Menu";

function App() {
  return (
    <div className="app">
      <Menu />
      <GameContainer />
    </div>
  );
}

export default App;
