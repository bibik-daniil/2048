export interface cell {
  readonly x: number;
  readonly y: number;
  score: number;
  availabilityScore: boolean;
  id: number;
}

export const initContainer = () => {
  const cellRow: cell[] = [];

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      cellRow.push({ x: x, availabilityScore: false, score: 0, y: y, id: Math.random()});
    }
  }

  return cellRow;
};
