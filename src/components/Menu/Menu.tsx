import React, { useState } from "react";
import Score from "./Score";
import cl from "./Menu.module.css";
import SettingsContainer from "./SettingsContainer";
import NewGame from "./NewGame";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setSettings } from "../../redux/settingsSlice";

const Menu = () => {
  const settings = useSelector((state: RootState) => state.settings);
  const [buttonSettings, setButtonSettings] = useState("Settings");
  const [presence, setPresence] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  const openSettings = () => {
    if (settings === false) {
      dispatch(setSettings());
      setButtonSettings("Back");
      setPresence(true)
      setDisabled(true)
      setTimeout(() => setDisabled(false), 1000)
    } else {
      dispatch(setSettings());
      setButtonSettings("Settings");
      setTimeout(() => setPresence(false), 970)
      setDisabled(true)
      setTimeout(() => setDisabled(false), 1000)
    }
  };

  return (
    <>
      <div className={cl.menu}>
        <h1>2048</h1>
        <Score />
      </div>
      <div className={cl.settings}>
        <NewGame />
        <button className={cl.buttonSettings} onClick={openSettings} disabled={disabled} style={disabled ? {backgroundColor: 'rgb(119, 110, 101)'} : {}}>
          <span>{buttonSettings}</span>
        </button>
      </div>
      {presence && <SettingsContainer />}
    </>
  );
};

export default Menu;
