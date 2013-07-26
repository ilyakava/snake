"use strict";
var US = _;

var Game = function (xBoard, yBoard) {
  this.board = new Block(xBoard, yBoard);
  var center = { x:(this.board.x / 2), y:(this.board.y / 2) };
  this.snake = Snake.spawn(center.x, center.y);
  this.score = 0;
  this.paused = false;

  var snake = this.snake;
  this.randomApple = function () {
    var apple = new Block(
    Math.floor((Math.random() * xBoard) + 1),
    Math.floor((Math.random() * yBoard) + 1)
    );
    if (US.any(snake.body, function(block) {
      return (block.x === apple.x) && (block.y === apple.y);
    })) {
      this.randomApple();
    } else {
      return apple;
    }
  };

  this.apple = this.randomApple();
};

// Game.prototype.resetApple = function () {
//   var that = this;
//   var randomApple = function () {
//     var apple = new Block(
//     Math.floor(Math.random() * that.board.x),
//     Math.floor(Math.random() * that.board.y)
//     );
//     if (US.any(that.snake.body, function(block) {
//       return (block.x === apple.x) && (block.y === apple.y);
//     })) {
//       randomApple();
//     } else {
//       return apple;
//     }
//   };
//   this.apple = randomApple();
// };


Game.prototype.step = function () {
  this.checkGrowth();
  this.snake.move();
};

Game.prototype.turn = function(direction) {
  this.snake.turn(direction);
};

Game.prototype.checkGrowth = function() {
  var that = this;
  var head = US.first(that.snake.body);
  var apple = this.apple;

  // console.log("snake head x",head.x, "apple x", apple.x, "snake head y", head.y, "apple y", apple.y);

  if ((head.x === apple.x) && (head.y === apple.y)) {
    this.snake.grow();
    this.score += 10;

    this.apple = this.randomApple();
  }
};

Game.prototype.over = function() {
  var that = this;
  var head = US.first(that.snake.body);
  var body = US.rest(that.snake.body);
  
  return (
    head.x < 0 || head.y < 0 ||
    head.x > that.board.x || head.y > that.board.y ||
    US.any(body, function(block) { return (block.x === head.x) && (block.y === head.y); })
  );
};