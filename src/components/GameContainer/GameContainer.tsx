import React, { useCallback, useEffect, useRef } from "react";
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
import useSound from "use-sound";
import ten from "../../sound/ten.mp3";
import twenty from "../../sound/twenty.wav";
import fourty from "../../sound/fourty.wav";
import oneHundred from "../../sound/oneHundred.wav";
import thousand from "../../sound/thousand.mp3";
import lose from "../../sound/gameOver.mp3";
import { initRandomScore } from "../../script/random";

const GameContainer = () => {
  const score = useSelector((state: RootState) => state.score);
  const square = useSelector((state: RootState) => state.square);
  const container = useSelector((state: RootState) => state.container);
  const gameOver = useSelector((state: RootState) => state.gameOver);
  const settings = useSelector((state: RootState) => state.settings);

  const [tenSound] = useSound(ten, { volume: 1 });
  const [twentySound] = useSound(twenty, { volume: 1 });
  const [fourtySound] = useSound(fourty, { volume: 1 });
  const [oneHundredSound] = useSound(oneHundred, { volume: 1 });
  const [thousandSound] = useSound(thousand, { volume: 1 });
  const [gameOverSound] = useSound(lose, { volume: 1 });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setContainer(startNewGame(square, dispatch, gameOver)));
  }, [square, dispatch]);

  useEffect(() => {
    if (gameOver) {
      gameOverSound();
    }
  }, [gameOver, gameOverSound]);

  const soundLock = useRef(false);

  useEffect(() => {
    if (score.increase > 0 && !soundLock.current) {
      soundLock.current = true;
      const currentIncrease = score.increase;

      if (currentIncrease <= 10) {
        tenSound();
      } else if (currentIncrease <= 20) {
        twentySound();
      } else if (currentIncrease <= 40) {
        fourtySound();
      } else if (currentIncrease <= 100) {
        oneHundredSound();
      } else {
        thousandSound();
      }

      setTimeout(() => {
        soundLock.current = false;
      }, 700);
    }
  }, [score.increase]);

  const keystroke = useCallback(
    (event: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
          event.key,
        ) &&
        gameOver === false
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

        dispatch(setContainer(initRandomScore(updatedContainer)));
        if (checkGameOver(updatedContainer, square)) {
          dispatch(setGameOver());
        }
      }
    },
    [container, dispatch, square],
  );

  useEffect(() => {
    document.addEventListener("keydown", keystroke);
    return () => document.removeEventListener("keydown", keystroke);
  }, [keystroke]);

  return (
    <div style={{ position: "relative" }}>
      <div
        className={cl.container}
        style={
          {
            "--cols": square.cols,
            "--rows": square.rows,
          } as React.CSSProperties
        }
      >
        {container.map((cell) => {
          return <CellContainer {...cell} key={cell.id} />;
        })}
      </div>

      {gameOver && (
        <div className={cl.overlay}>
          {square.cols > 3 ? (
            <div className={cl.gameOverText}>Вы проиграли</div>
          ) : (
            <div className={cl.miniGameOverText}>Вы проиграли</div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameContainer;
