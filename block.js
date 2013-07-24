"use strict";

var US = require('./underscore.js');

var Block = function (xCoord, yCoord) {
  this.x = xCoord;
  this.y = yCoord;
};

Block.prototype.add = function (block2) {
  var that = this;
  return new Block(that.x + block2.x, that.y + block2.y);
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
  this.oldDir = null;
  this.apex = NaN;
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
  if (that.apex < that.body.length) {
    var front = US.first(that.body, that.apex);
    front = US.map(front, function(unit) { return unit.add(that.facDir); });

    var back = US.rest(that.body, that.apex);
    back = US.map(back, function(unit) { return unit.add(that.oldDir); });

    this.body = front.concat(back);
    this.apex += 1;
  } else {
    this.body = US.map(that.body, function(unit) { return unit.add(that.facDir); });
  }
};

Snake.prototype.turn = function(direction) {
  this.oldDir = this.facDir;
  if (direction == "left") {
    this.facDir.left();
  } else {
    this.facDir.right();
  }
  this.apex = 1;
};

var Board = function (xBoard, yBoard) {
  this.x = xBoard;
  this.y = yBoard;
};

var Game = function (xBoard, yBoard) {
  this.board = new Board(xBoard, yBoard);
  var center = { x:(this.board.x / 2), y:(this.board.y / 2) };
  this.snake = Snake.spawn(center.x, center.y);
};

Game.prototype.step = function () {
  this.snake.move();
};

// Game.prototype.turn = function () {
//   this.snake
// }

var g = new Game(100,100);
var s = g.snake;
console.log(s.body);
g.step();
g.step();
console.log(s.body);