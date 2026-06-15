import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContainer } from "../../redux/containerSlice";
import { RootState } from "../../redux/store";
import { startNewGame } from "../../script/newGame";
import useSound from "use-sound";
import start from "../../sound/start.mp3"

const NewGame = () => {
  const [startSound] = useSound(start, {volume: 1})
  const square = useSelector((state: RootState) => state.square);
  
  const dispatch = useDispatch()

  const newGame = () => {
    startSound();
    dispatch(setContainer(startNewGame(square, dispatch)));
  };

  return (
    <button onClick={newGame}>
      New Game
    </button>
  );
};


export default NewGame;
