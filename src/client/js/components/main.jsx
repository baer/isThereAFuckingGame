'use strict'

const _ = require('lodash/fp');
const moment = require('moment');
const React = require('react')

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      homeTeam:'Rockies',
      homeStadium: 'Coors Field - Denver',
      data: {}
    }
  },

  getInitialState: function() {
    return { today: moment(new Date()) };
  },

  getNextGame: function(games) {
    const today = this.state.today;

    return _.flow(
      _.reject(function(game) { return today.isAfter(game.date, 'day'); }),
      _.minBy(function(game) { return moment(game.date).unix(); })
    )(games);
  },

  isThereAGameToday: function(nextGame) {
    const location = nextGame.location === this.props.homeStadium ? 'home' : 'away';

    if (this.state.today.isSame(nextGame.date, 'day')) {
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
    const nextGame = this.getNextGame(this.props.data);

    return (
      <div className='jumbotron content'>
        <h1>Is there a fucking { this.props.homeTeam } game today?</h1>

        {this.isThereAGameToday(nextGame)}

        <h2>{ this.props.homeTeam } vs. the fucking { nextGame.opponent }</h2>
        <h3>{ moment(nextGame.time, 'h:ma Z').format('h:mm a') } { moment(nextGame.date).format('dddd M/D/YYYY') } @ { nextGame.location}</h3>
      </div>
    );
  }
});
