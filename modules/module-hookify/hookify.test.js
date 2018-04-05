'use strict';

var o = require('ospec');
var hookify = require('../hookify');
var Brick = require('../../core/api');

o.spec('hookify', function () {

  var Foo = Brick.extends(function (_super) {
    this.pack = function (next) {
      _super.pack.call(this);
      console.log('Pack');
    }
  });

  o.spec('Can have different type of stacks', function () {
    o('Can be an array of function', function () {
      hookify(Foo.prototype);

      var foo = new Foo();

      foo.before('pack', function (next) {
        console.log('before pack');
        next();
      });

      foo.applyHooks('pack');

      foo.pack();
    });
  });
});
