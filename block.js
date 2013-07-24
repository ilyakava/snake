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

var Board = function (xBoard, yBoard) {
  this.x = xBoard;
  this.y = yBoard;
};

var Game = function (xBoard, yBoard) {
  this.board = new Board(xBoard, yBoard);
  var center = { x:(this.board.x / 2), y:(this.board.y / 2) };
  this.snake = Snake.spawn(center.x, center.y);
};


Game.spawnSnake