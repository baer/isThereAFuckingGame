import formatDate from "date-fns/format";
import getTime from "date-fns/get_time";
import isAfter from "date-fns/is_after";
import isToday from "date-fns/is_today";
import React from "react";

import { Footer } from "./footer.js";

const formatGameTime = (game) => {
  return isToday(game.date)
    ? `Today at ${formatDate(game.date, "h:mm a")}`
    : formatDate(game.date, "dddd, MMM D, YYYY h:mm a");
};

const getNextGame = (now, games) => {
  return games
    .filter((game) => { return isAfter(game.date, now); })
    .sort((game) => { return -getTime(game.date); })
    .shift();
};

const heroText = (homeStadium, nextGame) => {
  const isHomeGame = nextGame.location === homeStadium;

  if (isToday(nextGame.date)) {
    return (
      <div className="answer">
        YES
        <h2>It's a fucking { isHomeGame ? "home" : "away" } game</h2>
      </div>
    );
  } else {
    return <div className="answer">NO</div>;
  }
};

export default React.createClass({
  getDefaultProps() {
    return {
      homeTeam: "Rockies",
      homeStadium: "Coors Field - Denver",
      data: {}
    };
  },

  getInitialState() {
    return {
      today: new Date()
    };
  },

  render() {
    const nextGame = getNextGame(this.state.today, this.props.data);

    return (
      <div className="container">
        <div className="jumbotron content">
          <h1>Is there a fucking { this.props.homeTeam } game today?</h1>

          { heroText(this.props.homeStadium, nextGame) }

          <h2>{ this.props.homeTeam } vs. the fucking { nextGame.opponent }</h2>
          <h3>{ formatGameTime(nextGame) } @ { nextGame.location}</h3>
        </div>
        <Footer/>
      </div>
    );
  }
});
