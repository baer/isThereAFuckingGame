#!/usr/bin/env node

import { Command } from "commander";
// Lodash-FP doesn't support Ecmascript Modules.
// https://github.com/lodash/lodash/issues/5285
import fp from "lodash/fp.js";
import path from "path";
import { readFile, writeFile } from "fs/promises";
import { parse as parseCSV } from "csv-parse";
import { promisify } from "node:util";
// TODO: Replace with native or Luxon
import moment from "moment-timezone";

const JSON_SPACER = 2;

const {
  countBy,
  difference,
  drop,
  flatten,
  flow,
  head,
  identity,
  map,
  maxBy,
  zipObject,
} = fp;
const program = new Command();

const csvToJSON = (rawCsvData) => {
  const header = head(rawCsvData);
  const data = drop(1, rawCsvData);

  return map((row) => zipObject(header, row), data);
};

const formatData = (homeTeam, games) =>
  games.map((game) => {
    const date = moment.tz(
      `${game["START DATE"]} ${game["START TIME ET"]}`,
      "MM/DD/YY hh:mm a",
      "America/New_York"
    );

    const opponent = head([homeTeam], difference(getTeams(game)));

    return {
      date: date.format(),
      location: game.LOCATION,
      opponent,
    };
  });

// To tell what teams are playing, you have to look at the "SUBJECT" field of
// the CSV which is of the format `Dodgers at Rockies`. This converts a game
// object to `[Dodgers, Rockies]`
const getTeams = (game) => game.SUBJECT.split(" at ");

const getHomeTeam = flow(
  map(getTeams),
  // A list of all teams playing in all games
  flatten,
  // A count of the number of games each team played in
  countBy(identity),
  // The team with the most games played (should be the home team)
  (data) => maxBy((key) => data[key], Object.keys(data))
);

program
  .name("Schedule Converter")
  .description("Convert MLB schedules from CSV => JSON")
  .option(
    "-p, --path <filepath>",
    "Filepath to the csv schedule relative to this directory"
  )
  .option(
    "-d, --destination <filepath>",
    "Destination path to write the converted JSON file",
    "./src/game-data"
  )
  .action((options, name, command) => {
    // TODO: Figure out if there is a graceful way to check for empty args.
    // This is non-zero bc dafault values
    if (!options.path) {
      program.help();
    }

    const srcPath = path.resolve(options.path);
    const destinationPath = `${path.resolve(
      options.destination
    )}/schedule.json`;

    readFile(srcPath)
      .then(promisify(parseCSV))
      .then(csvToJSON)
      .then((data) => {
        return formatData(getHomeTeam(data), data);
      })
      .then((data) =>
        writeFile(destinationPath, JSON.stringify(data, null, JSON_SPACER))
      )
      .then(() => {
        console.log("All Finished!");
      });
  });

program.parse();
