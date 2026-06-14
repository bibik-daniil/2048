import React, { FC } from "react";
import cl from "./CellContainer.module.css";
import { cell } from "../../models/cellRows";

const CellContainer: FC<cell> = ({ x, y, score}) => {
  const getCellClass = (score: number): string => {
    switch (score) {
      case 2:
        return cl.two;
      case 4:
        return cl.four;
      case 8:
        return cl.eight;
      case 16:
        return cl.sixteen;
      case 32:
        return cl.thirtyTwo;
      case 64:
        return cl.sixtyFour;
      default:
        return cl.default;
    }
  };

  const cellClass = getCellClass(score);

  return (
    <>
      {score !== 0 ? (
        <div
          className={cellClass}
        >
          {score}
        </div>
      ) : (
        <div className={cl.cell} />
      )}
    </>
  );
};

export default CellContainer;
