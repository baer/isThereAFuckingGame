'use strict'

var _ = require('lodash');
var moment = require('moment');
var React = require('react')

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      homeTeam:'Rockies',
      homeStadium: /Coors Field/,
      data: {}
    }
  },

  getInitialState: function() {
    return { today: moment(new Date()) };
  },

  getNextGame: function(games) {
    var today = this.state.today;

    return _.chain(games)
      .reject(function(game) { return today.isAfter(game.date, 'day'); })
      .min(function(game) { return moment(game.date).unix(); })
      .value();
  },

  isThereAGameToday: function(nextGame) {
    var location = this.props.homeStadium.test(nextGame.location) ? 'home' : 'away';

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
    var nextGame = this.getNextGame(this.props.data);

    return (
      <div className='jumbotron content'>
        <h1>Is there a fucking { this.props.homeTeam } game today?</h1>

        {this.isThereAGameToday(nextGame)}

        <h2>{ this.props.homeTeam } vs. the fucking { nextGame.opponent }</h2>
        <h3>{ nextGame.time.replace('EDT', '') } { moment(nextGame.date).format('dddd M/D/YYYY') } @ { nextGame.location}</h3>
      </div>
    );
  }
});
