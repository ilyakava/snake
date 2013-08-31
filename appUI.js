"use strict";
var US = _;

$(document).ready(function() {
  var xBoard = function () {
    var userInput = parseInt((parseInt($('.dial.board-size').val())) / 2);
    return userInput;
  };
  var yBoard = xBoard;

  var speed = function () {
    var userInput = parseInt(8000 / (parseInt($('.dial.speed').val())));
    return userInput;
  };

  window.game = new Game(xBoard(), yBoard());
  
  // Create the board
  var createBoard = function () {
    $('table').html("");
    US.times(yBoard(), function(col) {
      var html = '<tr id="x' + col + '>';
      US.times(xBoard(), function(row) {
        html += ('<td id="x' + row + 'y' + col + '" class="empty"></td>');
      });
      html += '</tr>';

      $('table').append(html);
    });
  };

  var addSnake = function() {
    US.each(game.snake.body, function(block) {
      var idStr = "#x" + block.x + "y" + block.y;
      $(idStr).addClass('full');
    });
  };

  var addApple = function() {
    var idStr = "#x" + game.apple.x + "y" + game.apple.y;
    $(idStr).addClass('apple');
  };

  var clearBoard = function() {
    $('.full').removeClass('full');
    $('.apple').removeClass('apple');
  };

  var updateScore = function() {
    $('.score').html('Score: ' + game.score);
  }

  $('html').keydown(function (e) {
    if (e.keyCode == 37) {
      game.turn("west");
    } else if (e.keyCode == 39) {
      game.turn("east");
    } else if (e.keyCode == 38) {
      game.turn("north");
    } else if (e.keyCode == 40) {
      game.turn("south");
    } else if (e.keyCode == 80) {
      game.paused = !game.paused;
    }
  });

  var update = function() {
    if (!game.paused) {game.step();}
    clearBoard();
    addSnake();
    addApple();
    updateScore();
    if (game.over()) {
      createBoard();
      window.clearInterval(window.interval);
      window.interval = window.setInterval(update, speed());
      game = new Game(xBoard(), yBoard());
    }
  };

  // actually triggers the game
  createBoard();
  window.interval = window.setInterval(update, speed());

});