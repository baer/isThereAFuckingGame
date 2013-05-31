(function () {
  'use strict';

  function isDateLaterThan(a, b) {
    return a > b;
  }

  function getDayofTheWeek(a) {
    var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return weekday[a];
  }

  $(document).ready(function () {

    var url = 'data/schedule.min.json';

    var today = new Date();
    var nextGame = null;
    var todaysGame = null;

    // Check for game today               
    $.getJSON(url, function (json) {
      var nextGameDate;

      $.each(json.games, function (i, game) {
        nextGameDate = new Date(game.date);

        if (!nextGame && isDateLaterThan(nextGameDate, today)) {
          nextGame = game;
          return false;
        }

        if (today.getYear() === nextGameDate.getYear() && today.getMonth() === nextGameDate.getMonth() && today.getDate() === nextGameDate.getDate()) {
          todaysGame = game;
          return false;
        }
      });

      if (todaysGame) {
        $('.yesno').text('YES');
        $('#game .homeTeam').text('The Rockies ');
        $('#game .opponent').text(todaysGame.opponent);
        $('#game .startTime').text(todaysGame.time);
        $('#game .location').text(todaysGame.location);

        if (todaysGame.location === 'Coors Field') {
          $('#away').hide();
          $('#home').show();
        } else {
          $('#away').show();
          $('#home').hide();
        }
        $('#homeaway').show();
        $('#game').show();
      } else {
        $('.yesno').text('NO');
        var day = getDayofTheWeek(nextGameDate.getDay());
        $('#game .day').text('on ' + day);
        $('#game .date').text(nextGame.date);
        $('#game .homeTeam').text('The Rockies ');
        $('#game .opponent').text(nextGame.opponent);
        $('#game .startTime').text(nextGame.time);
        $('#game .location').text(nextGame.location);
        $('#game').show();
      }
    });
  });
}());