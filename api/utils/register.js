'use strict';

var Brick = require('../core/api');

// Register a Brick or a Brick initializer
function register(obj, force) {
  // Be sure that is only registered once
  // Can be forced registred by using force paramteter to true
  if (!Brick[obj.name] || force) {
    Brick[obj.name] = obj;
  }
}

module.exports = register;
