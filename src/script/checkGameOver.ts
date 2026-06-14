import { moveLeft } from "./move/moveLeft";
import { moveUp } from "./move/moveUp";
import { moveDown } from "./move/moveDown";
import { moveRight } from "./move/moveRight";
import { cell } from "../models/cellRows";
import { stateSquare } from "../redux/squareSlice";

export const checkGameOver = (
  container: cell[],
  dispatch: any,
  square: stateSquare,
) => {
  const opportunityMoveUp = moveUp(container, dispatch, square);
  const opportunityMoveDown = moveDown(container, dispatch, square);
  const opportunityMoveRight = moveRight(container, dispatch, square);
  const opportunityMoveLeft = moveLeft(container, dispatch, square);

  if (
    JSON.stringify(opportunityMoveUp) === JSON.stringify(container) &&
    JSON.stringify(opportunityMoveDown) === JSON.stringify(container) &&
    JSON.stringify(opportunityMoveRight) === JSON.stringify(container) &&
    JSON.stringify(opportunityMoveLeft) === JSON.stringify(container)
  ) {
    return true;
  }
};
