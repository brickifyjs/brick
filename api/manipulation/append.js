'use strict';

var find = require('../utils/find');
var relations = require('../core/relations');

/**
 * Insert a new brick at the end
 * */
function append(brickId) {

  this.bricks.push(brickId);

  // Assign relations between bricks
  relations.create(this.id, brickId);

  Brick.find(brickId).pack();

  this.repack();
}

module.exports = append;
