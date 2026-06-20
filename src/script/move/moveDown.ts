import { cell } from "../../models/cellRows";
import { initRandomScore } from "../random";
import { getNewScore } from "../../redux/scoreSlice";
import { stateSquare } from "../../redux/squareSlice";

export const moveDown = (
  container: cell[],
  dispatch: any,
  square: stateSquare,
) => {
    const newContainer = [...container];
  
    let increase = 0
    let change = false
  
    for (let row = square.rows - 1; row >= 0; row--) {
      for (let col = 0; col < square.cols; col++) {
        const index: number = row * square.cols + col;
  
        if (newContainer[index].score === 0) continue;
  
        let freeRow = row;
        while (freeRow < square.rows - 1) {
          const lowerIndex: number = (freeRow + 1) * square.cols + col;
          const lowerCell: cell = newContainer[lowerIndex];
  
          if (lowerCell.score === 0) {
            freeRow++;
          } else if (lowerCell.score === newContainer[index].score) {
            freeRow++;
            break;
          } else {
            break;
          }
        }
  
        const targetIndex: number = freeRow * square.cols + col;
  
        if (targetIndex !== index) {
          change = true
  
          if (newContainer[targetIndex].score === newContainer[index].score) {
            newContainer[targetIndex] = {
              ...newContainer[targetIndex],
              score: newContainer[targetIndex].score + newContainer[index].score,
            };
            increase += newContainer[targetIndex].score
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
  
      console.log('Функция moveDown')
  
    if (change) {
      console.log(increase)
      if (dispatch !== null) {
        dispatch(getNewScore(increase));
      }
      return newContainer;
    } else {
      return container;
    }
};
