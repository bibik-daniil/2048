import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContainer } from "../../redux/containerSlice";
import { RootState } from "../../redux/store";
import { startNewGame } from "../../script/newGame";

const NewGame = () => {
  const square = useSelector((state: RootState) => state.square);
  
  const dispatch = useDispatch()

  return (
    <>
      <button onClick={() => dispatch(setContainer(startNewGame(square, dispatch)))}>NewGame</button>
    </>
  );
};

export default NewGame;
