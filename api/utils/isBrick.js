'use strict';

var Brick = require('../core/api');
var find = require('./find');

function isBrick(obj) {
  return obj instanceof Brick || find(obj) instanceof Brick;
}

module.exports = isBrick;
