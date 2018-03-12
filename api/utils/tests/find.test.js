'use strict';

var o = require('ospec');
var Brick = require('../../core/api');
var find = require('../find');

o.spec('find', function () {
  var Foo = Brick.extends(function (_super) {
    this.constructor = function (id) {
      this.id = id;
      _super.constructor.call(this);
    };
  });

  var foo = new Foo('foo');

  o('Should find the instance by identifier', function () {
    o(find('foo')).equals(foo);
  });
});
