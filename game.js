"use strict";
var US = _;

var Game = function (xBoard, yBoard) {
  this.board = new Block(xBoard, yBoard);
  var center = { x:parseInt(this.board.x / 2), y:parseInt(this.board.y / 2) };
  this.snake = Snake.spawn(center.x, center.y);
  this.score = 0;
  this.paused = false;

  var snake = this.snake;
  this.randomApple = function () {
    var apple = new Block(
      Math.floor((Math.random() * (xBoard - 1)) + 1),
      Math.floor((Math.random() * (yBoard - 1)) + 1)
    );
    if (US.any(snake.body, function(block) {
      return (block.x === apple.x) && (block.y === apple.y);
    })) {
      randomApple();
    } else {
      return apple;
    }
  };

  this.apple = this.randomApple();
};

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

  if ((head.x === apple.x) && (head.y === apple.y)) {
    this.snake.grow();
    this.score += 10;

    this.apple = this.randomApple();
  }
};

Game.prototype.over = function(force) {
  var that = this;
  var head = US.first(that.snake.body);
  var body = US.rest(that.snake.body);
  
  return (
    force ||
    head.x < 1 || head.y < 0 ||
    head.x > that.board.x - 1 || head.y > that.board.y - 1 ||
    US.any(body, function(block) { return (block.x === head.x) && (block.y === head.y); })
  );
};