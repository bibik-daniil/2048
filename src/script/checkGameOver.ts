import { moveLeft } from "./move/moveLeft";
import { moveUp } from "./move/moveUp";
import { moveDown } from "./move/moveDown";
import { moveRight } from "./move/moveRight";
import { cell } from "../models/cellRows";
import { stateSquare } from "../redux/squareSlice";

export const checkGameOver = (
  container: cell[],
  square: stateSquare,
) => {
  const opportunityMoveUp = moveUp(container, null, square);
  const opportunityMoveDown = moveDown(container, null, square);
  const opportunityMoveRight = moveRight(container, null, square);
  const opportunityMoveLeft = moveLeft(container, null, square);

  if (
    JSON.stringify(opportunityMoveUp) === JSON.stringify(container) &&
    JSON.stringify(opportunityMoveDown) === JSON.stringify(container) &&
    JSON.stringify(opportunityMoveRight) === JSON.stringify(container) &&
    JSON.stringify(opportunityMoveLeft) === JSON.stringify(container)
  ) {
    return true;
  }
};
