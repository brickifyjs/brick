'use strict';

function flatten(array) {
    if (!array) {
        return [];
    }
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] instanceof Array) {
            array.splice.apply(array, [i, 1].concat(array[i]));
            i--;
        }
    }

    return array;
}

module.exports = flatten;
