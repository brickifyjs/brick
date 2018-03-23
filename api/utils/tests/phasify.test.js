'use strict';

var o = require('ospec');
var Brick = require('../../core/api');
var phasify = require('../phasify');

o.spec('phasify', function () {
  o('a', function () {
    var Foo = Brick.extends(function (_super) {

      this.constructor = function(bricks) {
        this.bricks = bricks;
        _super.constructor.call(this);
      };


      this.down('pack', function () {

      });

    });

    var Bar = Brick.extends(function (_super) {

      this.down('pack', function () {

      });

    })

    new Foo([
      new Bar().id
    ]).pack();

  });
});
