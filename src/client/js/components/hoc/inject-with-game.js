import getTime from "date-fns/get_time";
import isAfter from "date-fns/is_after";
import React from "react";

const UPDATE_INTERVAL = 1000;

const getNextGame = (now, games) => {
  return games
    .filter((game) => { return isAfter(game.date, now); })
    .sort((game) => { return -getTime(game.date); })
    .shift();
};

export default function (Component, gameData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        today: new Date()
      };
    }

    componentDidMount() {
      this.timer = setInterval(this.tick.bind(this), UPDATE_INTERVAL);
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }

    tick() {
      this.setState({ today: new Date() });
    }

    render() {
      return (
        <Component
          {...this.props}
          nextGame={getNextGame(this.state.today, gameData)}
        />
      );
    }
  };
}
