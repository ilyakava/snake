"use strict";
var US = _;

var Snake = function () {
  this.facDir = new Block(-1, 0);
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
  that.body.pop();
  // adds head to the tail
  this.body = [US.first(that.body).copy().add(that.facDir)].concat(that.body);
};

Snake.prototype.turn = function(direction) {
  if (
    direction == "west" &&
    this.facDir.x === 0 &&
    (this.facDir.y == -1 || this.facDir.y == 1)
  ) { this.facDir.west(); }
  else if (
    direction == "north" &&
    this.facDir.y === 0 &&
    (this.facDir.x == -1 || this.facDir.x == 1)
  ) { this.facDir.north(); }
  else if (
    direction == "east" &&
    this.facDir.x === 0 &&
    (this.facDir.y == -1 || this.facDir.y == 1)
  ) { this.facDir.east(); }
  else if (
    direction == "south" &&
    this.facDir.y === 0 &&
    (this.facDir.x == -1 || this.facDir.x == 1)
  ) { this.facDir.south(); }
};

Snake.prototype.grow = function() {
  var that = this;
  this.body.push(US.last(that.body).copy().subtract(that.facDir));
};