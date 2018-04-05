'use strict';

var find = require('../utils/find');
var relations = require('../core/relations');

/**
 * Insert a new brick at the beginning
 * */
function prepend(brickId) {
  this.bricks.unshift(brickId);

  // Assign relations between bricks
  relations.create(this.id, brickId);

  Brick.find(brickId).pack();

  this.repack();
}

module.exports = prepend;
