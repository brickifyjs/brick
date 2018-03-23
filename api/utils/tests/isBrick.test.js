'use strict';

var o = require('ospec');
var Brick = require('../../core/api');
var isBrick = require('../isBrick');

o.spec('isBrick', function () {
  var Foo = Brick.extends(function () {
  });

  var foo = new Foo();

  o('Should return if object is a brick or not', function () {
    o(isBrick(foo)).equals(true);
    o(isBrick({})).equals(false);
  });
});
