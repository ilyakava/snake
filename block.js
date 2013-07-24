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

var Snake = function () {
  this.orientation = new Block(-1, 0);
  this.body = [];
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
  this.body = US.map(that.body, function(unit) { return unit.add(that.orientation); });
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