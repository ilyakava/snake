"use strict";
var US = _;

var Game = function (xBoard, yBoard) {
  this.board = new Block(xBoard, yBoard);
  var center = { x:(this.board.x / 2), y:(this.board.y / 2) };
  this.snake = Snake.spawn(center.x, center.y);
  var that = this;

  this.apple = new Block(
    Math.floor((Math.random() * that.board.x)),
    Math.floor((Math.random() * that.board.y))
  );
};

// Game.prototype.resetApple = function () {
//   var that = this.board;
//   this.apple = new Block(
//     Math.floor((Math.random() * board.x)),
//     Math.floor((Math.random() * board.y))
//   );
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
    this.apple = new Block(
      Math.floor((Math.random() * that.board.x)),
      Math.floor((Math.random() * that.board.y))
    );
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