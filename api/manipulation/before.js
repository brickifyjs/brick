'use strict';

var find = require('../utils/find');
var relations = require('../core/relations');

/**
 * Insert a new brick before another
 * */
function insertBefore(brickId) {

  console.warn(this);

  if (this.parent) {
    console.log('has parent');
  } else {
    console.log('has no parent');
  }

  // get it has parent or not > __ROOT__ sinon index de la relation et appel insert index

  this.bricks.unshift(brickId);

  // Assign relations between bricks
  relations.create(this.id, brickId);

  Brick.find(brickId).pack();

  this.repack();
}

module.exports = insertBefore;
