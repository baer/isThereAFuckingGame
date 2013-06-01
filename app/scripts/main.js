(function () {
  'use strict';

  function isDateLaterThan(a, b) {
    return a > b;
  }

  function getDayofTheWeek(a) {
    var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return weekday[a];
  }

  function renderPage(data) {
    var source       = $('#entry-template').html();
    var templateHTML = Handlebars.compile(source)(data);
    $('.hero-unit').append(templateHTML);
  }

  $(document).ready(function () {

    var url = 'data/schedule.min.json',
        gameData = {},
        today = new Date(),
        nextGame = null,
        theGame;

    // Check for game today
    $.getJSON(url, function (json) {
      var nextGameDate;

      $.each(json.games, function (i, game) {
        nextGameDate = new Date(game.date);

        if ( (!nextGame && isDateLaterThan(nextGameDate, today)) || moment(today).isSame(nextGameDate, 'day') ){
          theGame = game;
          return false;
        }
      });

      nextGameDate = new Date(theGame.date);
      if (moment(today).isSame(nextGameDate, 'day')) {
        gameData.yesno     = 'YES';
        gameData.homeTeam  = 'The Rockies';
        gameData.opponent  = theGame.opponent;
        gameData.startTime = theGame.time;
        gameData.location  = theGame.location;
        gameData.homeAway  = (theGame.location === 'Coors Field') ? 'home' : 'away';
      } else {
        gameData.yesno     = 'NO';
        gameData.day       = 'on ' + getDayofTheWeek(theGame.getDay());
        gameData.date      = theGame.date;
        gameData.hometeam  = 'The Rockies ';
        gameData.opponent  = theGame.opponent;
        gameData.startTime = theGame.time;
        gameData.location  = theGame.location;
      }
      renderPage(gameData);
    });
  });
}());