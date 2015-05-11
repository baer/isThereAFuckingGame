'use strict';

var React = require('react');

var HeroUnit = require('./components/main.jsx');
var data = require('../../data/schedule.json');

// --------------------------------------------------------------------------------
var homeTeam = 'The Rockies';     // Change this to set a new home team
var homeStadium = 'Coors Field';  // Change this to set a new home stadium
// --------------------------------------------------------------------------------

React.render(
  React.createElement(HeroUnit, {
    homeTeam: homeTeam,
    homeStadium: homeStadium,
    data: data
  }),
  document.getElementById('react-container')
);
