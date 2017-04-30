#!/usr/bin/env node

const {
  countBy,
  difference,
  flatten,
  flow,
  head,
  identity,
  maxBy,
  zipObject
} = require("lodash");

const pify = require("pify");
const moment = require("moment-timezone");
const path = require("path");

const fs = pify(require("fs"));
const parseCSV = pify(require("csv-parse"));

const srcPath = path.resolve("./src/data/schedule.csv");
const destPath = `${path.resolve("./src/data") }/schedule.json`;

const JSON_SPACER = 2;

// To tell what teams are playing, you have to look at the "SUBJECT" field of the CSV which is
// of the format `Dodgers at Rockies`. This converts a game object to `[Dodgers, Rockies]`
const getTeams = (game) => game.SUBJECT.split(" at ");

const transform = function (games, homeTeam) {
  return games.map((game) => {
    // eslint-disable-next-line max-len
    const date = moment.tz(`${game["START DATE"] } ${ game["START TIME ET"]}`, "MM/DD/YY hh:mm a", "America/New_York");

    const opponent = head(
      difference(getTeams(game), [homeTeam])
    );

    return {
      date: date.format(),
      location: game.LOCATION,
      opponent
    };
  });
};

const getHomeTeam = function (games) {
  return flow(
    (data) => data.map(getTeams),
    // A list of all teams playing in all games
    flatten,
    // A count of the number of games each team played in
    (data) => countBy(data, identity),
    // The team with the most games played (should be the home team)
    (data) => maxBy(Object.keys(data), (key) => data[key])
  )(games);
};

const csvToJSON = (csvData) => {
  return csvData.slice(1)
    .map((row) => zipObject(csvData[0], row));
};

fs.readFile(srcPath)
  .then(parseCSV)
  .then(csvToJSON)
  .then((data) => {
    const homeTeam = getHomeTeam(data);
    return transform(data, homeTeam);
  })
  .then((data) => fs.writeFile(destPath, JSON.stringify(data, null, JSON_SPACER)))
  // eslint-disable-next-line
  .then(() => { console.log("All Finished!"); });
