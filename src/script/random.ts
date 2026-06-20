import { cell } from "../models/cellRows";

export const initRandomScore = (container: cell[]) => {
  const firstScore: number[] = [2, 2, 4]; // Сделал две двойки, чтобы шанс выпадения числа 2 был выше
  const initRandomScore = (arrayScore: number[]) =>
    arrayScore[Math.floor(Math.random() * firstScore.length)];
  const randomScore = initRandomScore(firstScore);
  const newContainer = [...container];

  const freeCells = newContainer
    .map((cell, index) => (cell.score === 0 ? index : -1))
    .filter((index) => index !== -1);

  if (freeCells.length === 0) {
    console.log("Вы проиграли:(");
    return newContainer;
  }

  const randomFreeIndex: number =
    freeCells[Math.floor(Math.random() * freeCells.length)];

  newContainer[randomFreeIndex] = {
    ...newContainer[randomFreeIndex],
    score: randomScore,
  };

  return newContainer;
};
