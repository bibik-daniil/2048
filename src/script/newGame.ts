import { initContainer } from "../models/cellRows";
import { setGameOver } from "../redux/gameOverSlice";
import { resetScore } from "../redux/scoreSlice";
import { stateSquare } from "../redux/squareSlice";
import { initRandomScore } from "./random";

export const startNewGame = (
  square: stateSquare,
  dispatch: any,
  gameOver: boolean
) => {
  const newContainer = initContainer(square);
  const containerWithRandomScore = initRandomScore(
    initRandomScore(newContainer),
  ); // Две функции initRandomScore, чтобы в начале было две ячейки с цифрами
  dispatch(resetScore());
  if (gameOver) {
    dispatch(setGameOver());
  }
  return containerWithRandomScore;
};
