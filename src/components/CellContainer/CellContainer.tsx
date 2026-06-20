import React, { FC } from "react";
import cl from "./CellContainer.module.css";
import { cell } from "../../models/cellRows";

const CellContainer: FC<cell> = ({ x, y, score }) => {
  const getCellClass = (score: number): {} => {
    switch (score) {
      case 2:
        return { backgroundColor: "#eee4da", color: "#776e65" };
      case 4:
        return { backgroundColor: "#ede0c8", color: "#776e65" };
      case 8:
        return { backgroundColor: "#f2b179", color: "#f9f6f2" };
      case 16:
        return { backgroundColor: "#f59563", color: "#f9f6f2" };
      case 32:
        return { backgroundColor: "#f67c5f", color: "#f9f6f2" };
      case 64:
        return { backgroundColor: "#f65e3b", color: "#f9f6f2" };
      case 128:
        return { backgroundColor: "#edcf72", color: "#f9f6f2", fontSize: 'var(--cell)' };
      case 256:
        return { backgroundColor: "#edcc61", color: "#f9f6f2", fontSize: 'var(--cell)' };
      case 512:
        return { backgroundColor: "#edc850", color: "#f9f6f2", fontSize: 'var(--cell)' };
      case 1024:
        return { backgroundColor: "#edc53f", color: "#f9f6f2", fontSize: 'var(--cell-thousand)' };
      case 2048:
        return { backgroundColor: "#EDC22E", color: "#f9f6f2", fontSize: 'var(--cell-thousand)' };
      case 4096:
        return { backgroundColor: "#FF44FF", color: "#f9f6f2", fontSize: 'var(--cell-thousand)' };
      case 8192:
        return { backgroundColor: "#3C3A32", color: "#f9f6f2", fontSize: 'var(--cell-thousand)' };  
      default:
        return {}
    }
  };

  const cellClass = getCellClass(score);

  return (
    <>
      {score === 0 ? (
        <div className={cl.cell}></div>
      ) : (
        <div className={cl.cell} style={cellClass}>
          {score}
        </div>
      )}
    </>
  );
};

export default CellContainer;
