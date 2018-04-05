'use strict';

var gobp = require('../../module-get-object-by-path');

/**
 * Get from Brick or brick, all or single or gobp
 */
function getter(prop, ctx) {

  if (!arguments.length) {
    return this;
  } else if ((ctx || this)[prop]) {
    return this[prop];
  }

  var obj = gobp(prop, ctx || this);

  return obj && obj.object.last;
}

module.exports = getter;
