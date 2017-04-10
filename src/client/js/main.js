const React = require("react");
const ReactDOM = require("react-dom");

const HeroUnit = require("./components/main.js");
const data = require("../../data/schedule.json");

const projectConfig = require("../../../project.config.js");

ReactDOM.render(
  React.createElement(HeroUnit, {
    homeTeam: projectConfig.homeTeam,
    homeStadium: projectConfig.homeStadium,
    data
  }),
  document.getElementById("react-container")
);
