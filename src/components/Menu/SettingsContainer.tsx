import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSquare } from "../../redux/squareSlice";
import { RootState } from "../../redux/store";
import cl from "./Menu.module.css";

const SettingsContainer = () => {
  interface stateSquare {
    rows: number | string;
    cols: number | string;
  }
  const [options, setOptions] = useState<stateSquare>({ rows: "", cols: "" });
  const settings = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  const adjustSquare = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(getSquare(options));
    if (options.cols < 2 || options.rows < 2) {
      alert()
    }
    setOptions({ rows: "", cols: "" });
  };
  return (
    <div className={settings? `${cl.formSettings} ${cl.moveContainer}`: `${cl.formSettings} ${cl.returnContainer}`}>
      <form  className={settings? cl.form : cl.Unform} onSubmit={adjustSquare}>
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
    </div>
  );
};

export default SettingsContainer;
