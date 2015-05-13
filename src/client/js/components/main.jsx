'use strict'

var _ = require('lodash');
var moment = require('moment');
var React = require('react')

// TODO: Move this into the schedule creation script
// TODO: Combine date+time
var formatData = function(data) {
  return _.map(data, function(game) {
    return {
      date: moment(game.date, 'MM/DD/YYYY'),
      location: game.location,
      opponent: game.opponent,
      time: game.time
    }
  })
}

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      homeTeam:'Rockies',
      homeStadium: 'Coors Field',
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
      .min(function(game) { return game.date.unix(); })
      .value();
  },

  isThereAGameToday: function(nextGame) {
    var location = nextGame.location === this.props.homeStadium ? 'home' : 'away';

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
    var formattedData = formatData(this.props.data)
    var nextGame = this.getNextGame(formattedData);

    return (
      <div className='jumbotron content'>
        <h1>Is there a fucking { this.props.homeTeam } game today?</h1>

        {this.isThereAGameToday(nextGame)}

        <h2>{ this.props.homeTeam } vs. the fucking { nextGame.opponent }</h2>
        <h3>{ nextGame.time } { nextGame.date.format('dddd M/D/YYYY') } @ { nextGame.location}</h3>
      </div>
    );
  }
});
