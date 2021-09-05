import React, { useState } from "react";
import Header from "./Header";
import { en_US } from "../src/static/languages";
const language = en_US;

export default function Launcher() {
  const [application, setApplication] = useState();
  document.title = language.title;
  const openApplication = (appObject) => {
    setApplication(appObject.application);
  };
  return (
    <div className="Header">
      <h1>{language.title}</h1>
      <span>{language.subTitle}</span>
      <Header openApplication={openApplication} />
      {application}
    </div>
  );
}
