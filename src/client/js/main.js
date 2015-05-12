'use strict';

var React = require('react');

var HeroUnit = require('./components/main.jsx');
var data = require('../../data/schedule.json');

var projectConfig = require('../../../project.config.js');

React.render(
  React.createElement(HeroUnit, {
    homeTeam: projectConfig.homeTeam,
    homeStadium: projectConfig.homeStadium,
    data: data
  }),
  document.getElementById('react-container')
);
