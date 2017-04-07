'use strict'

import {
  flow,
  minBy,
  reject
} from 'lodash/fp';
const moment = require('moment');
const React = require('react')

const isGameToday = (now, game) => moment(now).isSame(game.date, 'day');

const formatGameTime = (now, game) => {
  return isGameToday(now, game)
    ? moment(game.date).calendar()
    : moment(game.date).format('LLLL');
};

const getNextGame = (now, games) => {
  return flow(
    reject((game) => { return now.isAfter(game.date, 'day'); }),
    minBy((game) => { return moment(game.date).unix(); })
  )(games);
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
      today: moment(new Date())
    };
  },

  isThereAGameToday: function(nextGame) {
    const location = nextGame.location === this.props.homeStadium ? 'home' : 'away';

    if (isGameToday(this.state.today, nextGame)) {
      return (
        <div className='answer'>
          YES
          <h2>It's a fucking { location } game</h2>
        </div>
      );
    } else {
      return <div className='answer'>NO</div>
    }
  },

  render: function() {
    const nextGame = getNextGame(this.state.today, this.props.data);

    return (
      <div className='jumbotron content'>
        <h1>Is there a fucking { this.props.homeTeam } game today?</h1>

        {this.isThereAGameToday(nextGame)}

        <h2>{ this.props.homeTeam } vs. the fucking { nextGame.opponent }</h2>
        <h3>{ formatGameTime(this.state.today, nextGame) } @ { nextGame.location}</h3>
      </div>
    );
  }
});
