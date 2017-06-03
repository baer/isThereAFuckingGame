import React from "react";
import PropTypes from "prop-types";

import { Footer } from "./footer.js";
import { Jumbotron } from "./jumbotron.js";

const App = ({ homeTeam, homeStadium, nextGame }) => {
  return (
    <div className="container">
      <Jumbotron
        homeTeam={homeTeam}
        homeStadium={homeStadium}
        nextGame={nextGame}
      />
      <Footer/>
    </div>
  );
};

App.propTypes = {
  homeStadium: PropTypes.string,
  homeTeam: PropTypes.string,
  nextGame: PropTypes.object
};

App.defaultProps = {
  homeTeam: "Rockies",
  homeStadium: "Coors Field - Denver",
  data: {}
};

export {
  App
};
