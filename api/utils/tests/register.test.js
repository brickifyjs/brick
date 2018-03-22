'use strict';

var o = require('ospec');
var Brick = require('../../core/api');
var register = require('../register');

o.spec('register', function () {
  var Foo = Brick.extends(function () {
  });
  Foo.name = 'Foo';

  function foo() {
    return new Foo();
  }

  o('Register a Brick', function () {
    register(Foo);

    o(Brick.Foo).equals(Foo);
  });

  o('Register a Brick initializer', function () {
    register(foo);

    o(Brick.foo).equals(foo);
  });
});
