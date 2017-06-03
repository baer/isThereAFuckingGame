import getTime from "date-fns/get_time";
import isAfter from "date-fns/is_after";
import React from "react";

import { Footer } from "./footer.js";
import { Jumbotron } from "./jumbotron.js";

const getNextGame = (now, games) => {
  return games
    .filter((game) => { return isAfter(game.date, now); })
    .sort((game) => { return -getTime(game.date); })
    .shift();
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
        <Jumbotron
          homeTeam={this.props.homeTeam}
          homeStadium={this.props.homeStadium}
          nextGame={nextGame}
        />
        <Footer/>
      </div>
    );
  }
});
