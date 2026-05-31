import React, { useEffect, useState } from "react";
import { initContainer } from "../../models/cellRows";
import CellContainer from "../CellContainer/CellContainer";
import cl from "./GameContainer.module.css";

const GameContainer = () => {
  const [container, setContainer] = useState(initContainer());

  useEffect(() => {
    const initRandomIndex = () => Math.floor(Math.random() * container.length);
    const randomIndex = initRandomIndex();
    const randomCellScore = container.map((cell, index) => ({
      ...cell,
      score: index === randomIndex ? 2 : 0,
      availabilityScore: index === randomIndex ? true : false,
    }));
    setContainer(randomCellScore);
  }, []);

  return (
    <div className={cl.container}>
      {container.map((cell) => {
        return <CellContainer {...cell} key={cell.id} />;
      })}
    </div>
  );
};

export default GameContainer;
