'use strict'

import {
  flow,
  minBy,
  reject
} from 'lodash/fp';

var formatDate = require('date-fns/format');
var getTime = require('date-fns/get_time');
var isAfter = require('date-fns/is_after');
var isToday = require('date-fns/is_today');

const React = require('react')

const formatGameTime = (game) => {
  return isToday(game.date)
    ? `Today at ${formatDate(game.date, 'h:mm a')}`
    : formatDate(game.date, 'dddd, MMM D, YYYY h:mm a');
};

const getNextGame = (now, games) => {
  return flow(
    reject((game) => { return isAfter(now, game.date) }),
    minBy((game) => { return getTime(game.date); })
  )(games);
};

const heroText = (homeStadium, nextGame) => {
  const isHomeGame = nextGame.location === homeStadium;

  if (isToday(nextGame.date)) {
    return (
      <div className='answer'>
        YES
        <h2>It's a fucking { isHomeGame ? 'home' : 'away' } game</h2>
      </div>
    );
  } else {
    return <div className='answer'>NO</div>
  }
};

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      homeTeam:'Rockies',
      homeStadium: 'Coors Field - Denver',
      data: {}
    }
  },

  getInitialState: function() {
    return {
      today: new Date()
    };
  },

  render: function() {
    const nextGame = getNextGame(this.state.today, this.props.data);

    return (
      <div className='jumbotron content'>
        <h1>Is there a fucking { this.props.homeTeam } game today?</h1>

        { heroText(this.props.homeStadium, nextGame) }

        <h2>{ this.props.homeTeam } vs. the fucking { nextGame.opponent }</h2>
        <h3>{ formatGameTime(nextGame) } @ { nextGame.location}</h3>
      </div>
    );
  }
});
