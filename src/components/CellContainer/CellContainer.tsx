import React, { FC } from "react";
import cl from "./CellContainer.module.css";
import { cell } from "../../models/cellRows";

const CellContainer: FC<cell> = ({ x, y, score, availabilityScore }) => {
  return <div className={cl.cell}>{score !== 0 ? score : ""}</div>;
};

export default CellContainer;
