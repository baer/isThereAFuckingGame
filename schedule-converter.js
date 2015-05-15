#!/usr/bin/env node

'use strict';

var csv = require('csv');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var moment = require('moment-timezone');

var srcPath = path.resolve('./src/data/schedule.csv')
var destPath = path.resolve('./src/data') + '/schedule.json';

var transform = function(csvData, homeTeam) {
  return _.map(csvData.slice(1), function(row) {
    var gameData = _.zipObject(csvData[0], row);

    var date = moment.tz(gameData.START_DATE + ' ' + gameData.START_TIME_ET, 'MM/DD/YY hh:mm a', 'America/New_York');

    var opponent = _.find(gameData.SUBJECT.split(' at '), function(word) {
      return word !== homeTeam;
    });

    return {
      date: date.format(),
      location: gameData.LOCATION,
      opponent: opponent,
    };
  });
};

var getHomeTeam = function(csvData) {
  return _.chain(csvData.slice(1))
    // Generate an Array of Arrays of all of the teams that play each other
    // D-backs at Rockies -> ['D-backs', 'Rockies']
    .map(function(row) {
      var gameData = _.zipObject(csvData[0], row);
      return gameData.SUBJECT.split(' at ');
    })
    .flatten()
    // Reduce to an object containing unique team names and a count of occurances
    .reduce(function(memo, team) {
      if (!memo[team]) { memo[team] = 0; }
      memo[team]++;
      return memo;
    }, {})
    // Return the team that occurs the most
    .reduce(function(memo, gamesPlayed, team) {
      if (gamesPlayed > memo.gamesPlayed) {
        memo.gamesPlayed = gamesPlayed;
        memo.team = team;
      }
      return memo;
    }, { team: '', gamesPlayed: 0})
    .value()
    .team;
}

fs.readFile(srcPath, function (err, data) {
  if (err) throw err;

  csv.parse(data, function(err, data){
    if (err) throw err;

    var homeTeam = getHomeTeam(data);
    var jsonData = transform(data, homeTeam);

    fs.writeFile(destPath, JSON.stringify(jsonData), function (err) {
      if (err) throw err;
      console.log('Finished!');
    });
  });
});
