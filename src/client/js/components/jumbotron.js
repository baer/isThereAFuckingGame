import formatDate from "date-fns/format";
import isToday from "date-fns/is_today";
import PropTypes from "prop-types";
import React from "react";

const formatGameTime = (game) => {
  return isToday(game.date)
    ? `Today at ${formatDate(game.date, "h:mm a")}`
    : formatDate(game.date, "dddd, MMM D, YYYY h:mm a");
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

const Jumbotron = ({ homeTeam, homeStadium, nextGame }) => {
  return (
    <div className="jumbotron content">
      <h1>Is there a fucking { homeTeam } game today?</h1>

      { heroText(homeStadium, nextGame) }

      <h2>{ homeTeam } vs. the fucking { nextGame.opponent }</h2>
      <h3>{ formatGameTime(nextGame) } @ { nextGame.location}</h3>
    </div>
  );
};

Jumbotron.propTypes = {
  homeStadium: PropTypes.string,
  homeTeam: PropTypes.string,
  nextGame: PropTypes.string
};

export {
  Jumbotron
};
