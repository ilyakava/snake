"use strict";
var US = _;

$(document).ready(function() {
  var xBoard = 40;
  var yBoard = 40;

  var game = new Game(xBoard, yBoard);
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
      console.log(game.snake.body);
      $(idStr).addClass('full');
    });
  };

  var addApple = function() {
    var idStr = "#x" + game.apple.x + "y" + game.apple.x;
    $(idStr).addClass('apple');
  };

  var clearBoard = function() {
    $('.full').removeClass('full');
    $('.apple').removeClass('apple');
  };

  var left = function() {
    game.turn("left");
  };

  var right = function() {
    game.turn("right");
  };

  $('html').keydown(function (e) {
    if (e.keyCode == 37) {
      left();
    } else if (e.keyCode == 39) {
      right();
    }
  });

  var update = function() {
    clearBoard();
    addSnake();
    addApple();
    game.step();
    if (game.over()) {
      game = new Game(xBoard, yBoard);
    }
  };

  window.setInterval(update, 150);

});