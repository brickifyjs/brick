'use strict';

var Brick = require('../core/api');

function find(brickId) {
  return Brick.store[brickId];
}

module.exports = find;
