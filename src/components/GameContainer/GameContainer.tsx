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
import useSound from "use-sound";
import ten from "../../sound/ten.mp3"
import twenty from "../../sound/twenty.wav"
import fourty from "../../sound/fourty.wav"
import oneHundred from "../../sound/oneHundred.wav"
import thousand from "../../sound/thousand.mp3"
import lose from "../../sound/gameOver.mp3"

const GameContainer = () => {
  const score = useSelector((state: RootState) => state.score);
  const square = useSelector((state: RootState) => state.square);
  const container = useSelector((state: RootState) => state.container);
  const gameOver = useSelector((state: RootState) => state.gameOver);

  const [tenSound] = useSound(ten, {volume: 1})
  const [twentySound] = useSound(twenty, {volume: 1})
  const [fourtySound] = useSound(fourty, {volume: 1})
  const [oneHundredSound] = useSound(oneHundred, {volume: 1})
  const [thousandSound] = useSound(thousand, {volume: 1})
  const [gameOverSound] = useSound(lose, {volume: 1})
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setContainer(startNewGame(square, dispatch)));
  }, [square]);

  useEffect(() => {
    if (gameOver) {
      gameOverSound();
    }
  }, [gameOver, gameOverSound])

  useEffect(() => {
    if (score.increase > 0 && score.increase <= 10) {
      tenSound();
    }
    if (score.increase > 10 && score.increase <= 20) {
      twentySound();
    }
    if (score.increase > 20 && score.increase <= 40) {
      fourtySound();
    }
    if (score.increase > 40 && score.increase <= 100) {
      oneHundredSound();
    }
    if (score.increase > 100) {
      thousandSound();
    }
  }, [score, tenSound])

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
