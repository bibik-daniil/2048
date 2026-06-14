import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cl from "./Menu.module.css";
import { RootState } from "../../redux/store";

const Score = () => {
  const score = useSelector((state: RootState) => state.score);
  const [increase, setIncrease] = useState(cl.noneIncrease);

  useEffect(() => {
    if (score.increase > 0) {
      setIncrease(cl.increase);
      setTimeout(() => setIncrease(cl.noneIncrease), 1000);
    }
  }, [score]);

  return (
    <div className={cl.getScore}>
      <span className={increase}>+{score.increase}</span>
      <div className={cl.score}>
        <h2>Score</h2>
        {score.score}
      </div>
    </div>
  );
};

export default Score;
