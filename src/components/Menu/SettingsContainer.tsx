import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getSquare } from "../../redux/squareSlice";
import cl from "./Menu.module.css";

const SettingsContainer = () => {
  interface stateSquare {
    rows: number | string;
    cols: number | string;
  }
  const [options, setOptions] = useState<stateSquare>({ rows: "", cols: "" });
  const dispatch = useDispatch();

  const adjustSquare = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(getSquare(options));
    setOptions({ rows: "", cols: "" });
  };
  return (
    <>
      <form  className={cl.form} onSubmit={adjustSquare}>
        <label>
          Число строк:{" "}
          <input
            type="number"
            min="2"
            value={options.rows}
            onChange={(e) => setOptions({ ...options, rows: e.target.value })}
          ></input>
        </label>
        <label>
          Число столбцов:{" "}
          <input
            type="number"
            min="2"
            value={options.cols}
            onChange={(e) => setOptions({ ...options, cols: e.target.value })}
          ></input>
        </label>
        <button type="submit" className={cl.submitButton}>Oк</button>
      </form>
    </>
  );
};

export default SettingsContainer;
