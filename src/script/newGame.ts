import { initContainer } from "../models/cellRows";
import { setGameOver } from "../redux/gameOverSlice";
import { resetScore } from "../redux/scoreSlice";
import { stateSquare } from "../redux/squareSlice";
import { initRandomScore } from "./random";

export const startNewGame = (
  square: stateSquare,
  dispatch: any,
) => {
  const newContainer = initContainer(square);
  const containerWithRandomScore = initRandomScore(
    initRandomScore(newContainer),
  ); // Две функции initRandomScore, чтобы в начале было две ячейки с цифрами
  dispatch(resetScore());
  dispatch(setGameOver(false));
  return containerWithRandomScore;
};
