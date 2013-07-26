"use strict";
var US = _;

$(document).ready(function() {
  var xBoard = 18;
  var yBoard = 18;
  var speed = 100;

  window.game = new Game(xBoard, yBoard);
  // Create the board
  US.times(yBoard, function(col) {
    var html = '<tr id="x' + col + '>';
    US.times(xBoard, function(row) {
      html += ('<td id="x' + row + 'y' + col + '" class="empty"></td>');
    });
    html += '</tr>';

    $('table').append(html);
  });

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
    clearBoard();
    addSnake();
    addApple();
    if (!game.paused) {game.step();}
    updateScore();
    if (game.over()) {
      // clearInterval(interval);
      game = new Game(xBoard, yBoard);
    }
  };

  var interval = window.setInterval(update, speed);

});