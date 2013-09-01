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

Snake.prototype.checkSides = function () {
  var that = this;
  var head = US.first(that.body);
  var body = US.rest(that.body);
};

Snake.prototype.turn = function(direction) {
  var that = this;
  // Will check for equality to avoid an illegal U turn
  // within a single step, leading to autophagy
  var head = US.first(that.body);
  var second = US.first(US.rest(that.body));

  if (
    direction == "west" &&
    !head.copy().add(that.facDir.copy().west()).equal(second) &&
    this.facDir.x === 0 &&
    (this.facDir.y == -1 || this.facDir.y == 1)
  ) { this.facDir.west(); }
  else if (
    direction == "north" &&
    !head.copy().add(that.facDir.copy().north()).equal(second) &&
    this.facDir.y === 0 &&
    (this.facDir.x == -1 || this.facDir.x == 1)
  ) { this.facDir.north(); }
  else if (
    direction == "east" &&
    !head.copy().add(that.facDir.copy().east()).equal(second) &&
    this.facDir.x === 0 &&
    (this.facDir.y == -1 || this.facDir.y == 1)
  ) { this.facDir.east(); }
  else if (
    direction == "south" &&
    !head.copy().add(that.facDir.copy().south()).equal(second) &&
    this.facDir.y === 0 &&
    (this.facDir.x == -1 || this.facDir.x == 1)
  ) { this.facDir.south(); }
};

Snake.prototype.grow = function() {
  var that = this;
  this.body.push(US.last(that.body).copy().subtract(that.facDir));
};