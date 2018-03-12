'use strict';

var o = require('ospec');
var flatten = require('../flatten');

o.spec('flatten', function () {
  var arr = [0, 1, [1], [[0, 1, [[[[1]]]]]]];
  o('Array should be flatten', function () {
    o(flatten(arr).length).equals(6);
  });
});
