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

Block.prototype.west = function () {
  this.x = -1;
  this.y = 0;
};

Block.prototype.north = function () {
  this.x = 0;
  this.y = -1;
};

Block.prototype.east = function () {
  this.x = 1;
  this.y = 0;
};

Block.prototype.south = function () {
  this.x = 0;
  this.y = 1;
};