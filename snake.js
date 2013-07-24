"use strict";
var US = _;

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