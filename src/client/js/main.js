import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components/app.js";

import data from "../../data/schedule.json";
import injectWithGame from "./components/hoc/inject-with-game.js";

import projectConfig from "../../../project.config.js";

ReactDOM.render(
  React.createElement(injectWithGame(App, data), {
    homeTeam: projectConfig.homeTeam,
    homeStadium: projectConfig.homeStadium
  }),
  document.getElementById("react-container")
);
