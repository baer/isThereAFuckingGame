'use strict';

var csv = require('csv');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var moment = require('moment-timezone');

var teamName = 'Rockies';
var srcPath = path.resolve('./src/data/schedule.csv')
var destPath = path.resolve('./src/data') + '/schedule.json';

var transform = function(csvData) {
  return _.map(csvData.slice(1), function(row) {
    var gameData = _.zipObject(csvData[0], row);

    var date = moment(gameData.START_DATE + ' ' + gameData.START_TIME_ET, 'MM/DD/YYYY hh:mm a')
      .tz('America/New_York');

    var opponent = _.find(gameData.SUBJECT.split(' '), function(word) {
      return word !== teamName && word !== 'at';
    });

    return {
      date: date.format(),
      location: gameData.LOCATION,
      opponent: opponent,
    };
  });
}

fs.readFile(srcPath, function (err, data) {
  if (err) throw err;

  csv.parse(data, function(err, data){
    if (err) throw err;

    fs.writeFile(destPath, JSON.stringify(transform(data)), function (err) {
      if (err) throw err;
      console.log('Finished!');
    });
  });
});
