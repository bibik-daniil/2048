import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContainer } from "../../redux/containerSlice";
import { RootState } from "../../redux/store";
import { startNewGame } from "../../script/newGame";
import useSound from "use-sound";
import start from "../../sound/start.mp3"

const NewGame = () => {
  const [startSound] = useSound(start, {volume: 1})
  const square = useSelector((state: RootState) => state.square);
  const gameOver = useSelector((state: RootState) => state.gameOver);
  
  const dispatch = useDispatch()

  const soundLock = useRef(false);

  const newGame = () => {
    if (!soundLock.current) {
      soundLock.current = true
      startSound();
      setTimeout(()=> soundLock.current = false, 13000)
    }
    dispatch(setContainer(startNewGame(square, dispatch, gameOver)));
  };

  return (
    <button onClick={newGame}>
      New Game
    </button>
  );
};


export default NewGame;
