'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var HeroUnit = require('./components/main.jsx');
var data = require('../../data/schedule.json');

var projectConfig = require('../../../project.config.js');

ReactDOM.render(
  React.createElement(HeroUnit, {
    homeTeam: projectConfig.homeTeam,
    homeStadium: projectConfig.homeStadium,
    data: data
  }),
  document.getElementById('react-container')
);
