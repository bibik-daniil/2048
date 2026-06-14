import React, { useState } from "react";
import Score from "./Score";
import cl from "./Menu.module.css";
import SettingsContainer from "./SettingsContainer";
import NewGame from "./NewGame";

const Menu = () => {
  const [settings, setSettings] = useState(false);
  const [buttonSettings, setButtonSettings] = useState("Settings");

  const openSettings = () => {
    if (settings === false) {
      setSettings(true);
      setButtonSettings("Back");
    } else {
      setSettings(false);
      setButtonSettings("Settings");
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
        <button onClick={openSettings}>
          <span>{buttonSettings}</span>
        </button>
      </div>
      {settings && <SettingsContainer />}
    </>
  );
};

export default Menu;
