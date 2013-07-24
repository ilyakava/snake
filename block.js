"use strict";
var US = _;

var Block = function (xCoord, yCoord) {
  this.x = xCoord;
  this.y = yCoord;
};


Block.prototype.add = function (block2) {
  var that = this;
  return new Block(that.x + block2.x, that.y + block2.y);
};

Block.prototype.subtract = function (block2) {
  var that = this;
  return new Block(that.x - block2.x, that.y - block2.y);
};

Block.prototype.copy = function () {
  var that = this;
  return new Block(that.x, that.y);
};

Block.prototype.left = function () {
  var tmpY = this.y;
  if (this.y === 0) {
    this.y = -this.x;
    this.x = tmpY;
  } else {
    this.y = this.x;
    this.x = tmpY;
  }
};

Block.prototype.right = function () {
  var tmpY = this.y;
  if (this.x === 0) {
    this.y = this.x;
    this.x = -tmpY;
  } else {
    this.y = this.x;
    this.x = tmpY;
  }
};

var Snake = function () {
  this.facDir = new Block(-1, 0);
  this.body = [];
  // this.oldDir = null;
  // this.apex = NaN;
};

Snake.spawn = function (xCenter, yCenter) {
  var initSnake = new Snake();

  US.times(3, function(i) {
    initSnake.body.push(new Block(xCenter + i, yCenter));
  });
  return initSnake;
};

Snake.prototype.move = function () {
  var that = this;
  that.body.pop();
  // adds head to the tail
  this.body = [US.first(that.body).copy().add(that.facDir)].concat(that.body);
};

Snake.prototype.turn = function(direction) {
  this.oldDir = this.facDir.copy();
  if (direction == "left") {
    this.facDir.left();
  } else {
    this.facDir.right();
  }
  this.apex = 1;
};

Snake.prototype.grow = function() {
  var that = this;
  this.body.push(US.last(that.body).copy().subtract(that.oldDir));
};

var Board = function (xBoard, yBoard) {
  this.x = xBoard;
  this.y = yBoard;
};

// var Apple = function (xCoord, yCoord) {
//   this.x = xCoord;
//   this.y = yCoord;
// };

var Game = function (xBoard, yBoard) {
  this.board = new Board(xBoard, yBoard);
  var center = { x:(this.board.x / 2), y:(this.board.y / 2) };
  this.snake = Snake.spawn(center.x, center.y);
  
  var board = this.board;
  this.apple = new Block(
    Math.floor((Math.random() * board.x)),
    Math.floor((Math.random() * board.y))
  );
};


// Game.prototype.randomApple = function () {
//   var that = this;
//   return new Apple(
//     Math.floor((Math.random() * that.board.x + 1)),
//     Math.floor((Math.random() * that.board.y + 1))
//   );
// };

Game.randomBlock = function () {
  var that = this;
  return new Block(
    Math.floor((Math.random() * that.board.x)),
    Math.floor((Math.random() * that.board.y))
  );
};

Game.prototype.step = function () {
  this.grow();
  this.snake.move();
};

Game.prototype.turn = function(direction) {
  this.snake.turn(direction);
};

Game.prototype.grow = function() {
  var that = this;
  var head = US.first(that.snake.body);
  var apple = this.apple;

  console.log("snake head x",head.x, "apple x", apple.x, "snake head y", head.y, "apple y", apple.y);

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


// var g = new Game(20,20);
// var s = g.snake;
// console.log("initial");
// console.log(s.body);

// g.turn("right");
// g.step();

// console.log(s.facDir);
// console.log(s.oldDir);

// g.grow();
// console.log("second");
// console.log(s.body);


// g.step();
// console.log("third");
// console.log(s.body);

// g.turn("left");
// g.step();
// console.log("first after left");
// console.log(s.body);

// g.step();
// console.log("second after left");
// console.log(s.body);

// g.step();
// console.log("third after left");
// console.log(s.body);
