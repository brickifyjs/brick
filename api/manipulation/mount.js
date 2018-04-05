// Brick , crrud rest = brick instance
// brick, crud, rest = brick prop


'use strict';

var find = require('../utils/find');
var relations = require('../core/relations');

/**
 * Insert a new brick at the end
 * */
function mount(brickId) { // alias replace

  this.bricks = [brickId];

  // Remove relations
  // Destroy bricks

  // Assign relations between bricks
  relations.create(this.id, brickId);

  Brick.find(brickId).pack();

  this.repack();
}

module.exports = append;

