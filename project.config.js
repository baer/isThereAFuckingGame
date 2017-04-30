const path = require("path");

const config = module.exports = {};

config.root = __dirname;
config.src = "src/client";
config.dest = "dist-dev";
config.srcFullPath = path.join(config.root, config.src);
config.destFullPath = path.join(config.root, config.dest);

config.js = "js";
config.styles = "styles";

// --------------------------------------------------
//       Edit these to customize for your team
// --------------------------------------------------
config.homeTeam = "Rockies";
config.homeStadium = "Coors Field - Denver";

config.googleAnalytics = "UA-32746833-1";
config.websiteTitle = "Is there a fucking Rockies game?";
config.websiteDescription = "Is there a fucking Rockies game today?";
config.websiteKeywords = "rockies, colorado rockies, rockies game, schedule, mlb, baseball, major league baseball";
