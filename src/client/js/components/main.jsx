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
        <div>
          YES
          <h1>It's a fucking { location } game</h1>
        </div>
      )
    } else {
      return <div>NO</div>
    }
  },

  render: function() {
    var formattedData = formatData(this.props.data)
    var nextGame = this.getNextGame(formattedData);

    return (
      <div className='jumbotron content'>
        <h1 className='question'>Is there a fucking { this.props.homeTeam } game today?</h1>
          <section className='answer'>
            {this.isThereAGameToday(nextGame)}
          </section>
        <h2 className='game-info'>
          The { this.props.homeTeam } play the fucking { nextGame.opponent } at { nextGame.time } @ { nextGame.location} { nextGame.date.format('dddd M/D/YYYY') }
        </h2>
      </div>
    );
  }
});
