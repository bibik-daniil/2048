import { cell } from "../../models/cellRows";
import { initRandomScore } from "../random";
import { getNewScore } from "../../redux/scoreSlice";
import { stateSquare } from "../../redux/squareSlice";

export const moveRight = (
  container: cell[],
  dispatch: any,
  square: stateSquare,
) => {
  const newContainer = [...container];

  let change = false;

  let accountIncreaseAmount: number[] = [];

  for (let row = 0; row < square.rows; row++) {
    for (let col = square.cols - 1; col >= 0; col--) {
      const index: number = row * square.cols + col;

      if (newContainer[index].score === 0) continue;

      let freeCol = col;
      while (freeCol < square.cols - 1) {
        const rightIndex: number = row * square.cols + (freeCol + 1);
        const rightCell: cell = newContainer[rightIndex];

        if (rightCell.score === 0) {
          freeCol++;
        } else if (rightCell.score === newContainer[index].score) {
          freeCol++;
          break;
        } else {
          break;
        }
      }

      const targetIndex: number = row * square.cols + freeCol;

      if (targetIndex !== index) {
        change = true

        if (newContainer[targetIndex].score === newContainer[index].score) {
          newContainer[targetIndex] = {
            ...newContainer[targetIndex],
            score: newContainer[targetIndex].score + newContainer[index].score,
          };
          accountIncreaseAmount.push(newContainer[targetIndex].score);
          newContainer[index] = { ...newContainer[index], score: 0 };
        } else {
          newContainer[targetIndex] = {
            ...newContainer[targetIndex],
            score: newContainer[index].score,
          };
          newContainer[index] = { ...newContainer[index], score: 0 };
        }
      }
    }
  }

  if (change) {
    const increase = accountIncreaseAmount.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );

    dispatch(getNewScore(increase));
    return initRandomScore(newContainer);
  } else {
    return container;
  }
};
