import { stateSquare } from "../redux/squareSlice";
import { RootState } from "../redux/store";

export interface cell {
  readonly x: number;
  y: number;
  score: number;
  id: number;
}

export const initContainer = (square: stateSquare) => {
  const cellRow: cell[] = [];

  for (let y = 0; y < square.cols; y++) {
    for (let x = 0; x < square.rows; x++) {
      cellRow.push({ x: x, score: 0, y: y, id: Math.random()});
    }
  }

  return cellRow;
};
