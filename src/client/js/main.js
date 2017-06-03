import React from "react";
import ReactDOM from "react-dom";

import App from "./components/index.js";
import data from "../../data/schedule.json";

import projectConfig from "../../../project.config.js";

ReactDOM.render(
  React.createElement(App, {
    homeTeam: projectConfig.homeTeam,
    homeStadium: projectConfig.homeStadium,
    data
  }),
  document.getElementById("react-container")
);
