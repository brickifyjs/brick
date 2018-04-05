'use strict';



/**
 * Destroy a brick
 * */
function destroy() {
  //  array.splice(this.id, 1);

  Brick.find(this.id) = null;
  delete Brick.store[this.id];
}

module.exports = destroy;
