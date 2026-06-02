import React, { useEffect, useState } from "react";
import { initContainer } from "../../models/cellRows";
import CellContainer from "../CellContainer/CellContainer";
import cl from "./GameContainer.module.css";

const GameContainer = () => {
  const [container, setContainer] = useState(initContainer());

  const initRandomIndex = () => Math.floor(Math.random() * container.length);
  const firstScore: number[] = [2, 2, 4]; // Сделал две двойки, чтобы шанс выпадения числа 2 был выше
  const initRandomScore = (arrayScore: number[]) =>
    arrayScore[Math.floor(Math.random() * firstScore.length)];

  const randomCellScore = () => {
    const randomIndex: number = initRandomIndex();
    const randomScore = initRandomScore(firstScore);

   const startContainer = container.map((cell, index) => ({
    ...cell,
    score: index === randomIndex ? randomScore : 0,
    availabilityScore: index === randomIndex ? true : false,
  }))

  setContainer(startContainer)
};

  useEffect(() => {
    randomCellScore();
  }, []);

  useEffect(() => {
    const keystroke = (event: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        event.preventDefault();

        const newContainer = [...container];

        switch (event.key) {
          case "ArrowUp":
            let availabilityScoreIndex = newContainer.findIndex(cell => cell.availabilityScore);
            console.log(availabilityScoreIndex);
            newContainer[availabilityScoreIndex].availabilityScore = false
            newContainer[availabilityScoreIndex].score = 0
            newContainer[availabilityScoreIndex-4].availabilityScore = true
            newContainer[availabilityScoreIndex-4].score = 2
            randomCellScore()
            setContainer(newContainer);
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener("keydown", keystroke);
    return () => document.removeEventListener("keydown", keystroke);
  }, [container]);

  return (
    <div className={cl.container}>
      {container.map((cell) => {
        return <CellContainer {...cell} key={cell.id} />;
      })}
    </div>
  );
};

export default GameContainer;
