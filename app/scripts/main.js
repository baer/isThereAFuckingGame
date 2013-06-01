(function () {
  'use strict';

  var url = 'data/schedule.min.json',
      today = new Date();

  function gameDataAsJSON(game) {
    var gameData = {};

    gameData.homeTeam  = 'The Rockies';
    gameData.opponent  = game.opponent;
    gameData.startTime = game.time;

    if (moment(today).isSame(game.date, 'day')) {
      gameData.yes       = true;
      gameData.yesno     = 'YES';
      gameData.location  = game.location;
      gameData.homeAway  = (game.location === 'Coors Field') ? 'home' : 'away';
    } else {
      gameData.yesno     = 'NO';
      gameData.location  = game.location;
      gameData.day       = moment(game.date).format('dddd M/D/YY');
    }
    return gameData;
  }

  function renderPage(data) {
    var source       = $('#entry-template').html();
    var templateHTML = Handlebars.compile(source)(data);
    $('.hero-unit').append(templateHTML);
  }

  $(document).ready(function () {

    $.getJSON(url, function (json) {
      var theGame;

      $.each(json.games, function (i, game) {
        if ( moment(today).isBefore(game.date, 'day') || moment(today).isSame(game.date, 'day') ){
          theGame = game;
          return false;
        }
      });

      var gameJSON = gameDataAsJSON(theGame);
      renderPage(gameJSON);
    });
  });

}());