import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CellContainer from "../CellContainer/CellContainer";
import cl from "./GameContainer.module.css";
import { moveLeft } from "../../script/move/moveLeft";
import { moveUp } from "../../script/move/moveUp";
import { moveDown } from "../../script/move/moveDown";
import { moveRight } from "../../script/move/moveRight";
import { checkGameOver } from "../../script/checkGameOver";
import { startNewGame } from "../../script/newGame";
import { setContainer } from "../../redux/containerSlice";
import { setGameOver } from "../../redux/gameOverSlice";

const GameContainer = () => {
  const square = useSelector((state: RootState) => state.square);
  const container = useSelector((state: RootState) => state.container);
  const gameOver = useSelector((state: RootState) => state.gameOver);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setContainer(startNewGame(square, dispatch)));
  }, [square]);

  useEffect(() => {
    const keystroke = (event: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        event.preventDefault();

        const newContainer = [...container];
        let updatedContainer;

        switch (event.key) {
          case "ArrowUp":
            updatedContainer = moveUp(newContainer, dispatch, square);
            break;
          case "ArrowLeft":
            updatedContainer = moveLeft(newContainer, dispatch, square);
            break;
          case "ArrowDown":
            updatedContainer = moveDown(newContainer, dispatch, square);
            break;
          case "ArrowRight":
            updatedContainer = moveRight(newContainer, dispatch, square);
            break;
          default:
            return;
        }

        dispatch(setContainer(updatedContainer));
        if (checkGameOver(updatedContainer, dispatch, square)) {
          dispatch(setGameOver(true));
          console.log("ghjbuhasdgag");
        }
      }
    };

    document.addEventListener("keydown", keystroke);
    return () => document.removeEventListener("keydown", keystroke);
  }, [container]);

  return (
    <div style={{ position: "relative" }}>
      <div
        className={cl.container}
        style={{
          gridTemplateColumns: `repeat(${square.cols}, 100px)`,
          gridTemplateRows: `repeat(${square.rows}, 100px)`,
        }}
      >
        {container.map((cell) => {
          return <CellContainer {...cell} key={cell.id} />;
        })}
      </div>

      {gameOver && (
        <div className={cl.overlay}>
          <div className={cl.gameOverText}>Вы проиграли</div>
        </div>
      )}
    </div>
  );
};

export default GameContainer;
