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
