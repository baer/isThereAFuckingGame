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
        todaysGame = null;

    // Check for game today
    // TODO: Cleanup with moment.js              
    $.getJSON(url, function (json) {
      var nextGameDate;

      $.each(json.games, function (i, game) {
        nextGameDate = new Date(game.date);

        if (!nextGame && isDateLaterThan(nextGameDate, today)) {
          nextGame = game;
          return false;
        }

        if (today.getYear() === nextGameDate.getYear() &&
            today.getMonth() === nextGameDate.getMonth() &&
            today.getDate() === nextGameDate.getDate()) {
          todaysGame = game;
          return false;
        }
      });

      if (todaysGame) {
        gameData.yesno     = 'YES';
        gameData.homeTeam  = 'The Rockies';
        gameData.opponent  = todaysGame.opponent;
        gameData.startTime = todaysGame.time;
        gameData.location  = todaysGame.location;
        gameData.homeAway  = (todaysGame.location === 'Coors Field') ? 'home' : 'away';
      } else {
        gameData.yesno     = 'NO';
        gameData.day       = 'on ' + getDayofTheWeek(nextGameDate.getDay());
        gameData.date      = nextGame.date;
        gameData.hometeam  = 'The Rockies ';
        gameData.opponent  = nextGame.opponent;
        gameData.startTime = nextGame.time;
        gameData.location  = nextGame.location;
      }
      renderPage(gameData);
    });
  });
}());