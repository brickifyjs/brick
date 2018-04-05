var o = require('ospec');
var getter = require('../getter');

o.spec("getter", function () {
  var obj = {
    getter: getter,
    bricks: {
      foo: [{
        id: 1,
        value: [
          ['bar']
        ]
      }]
    }
  };

  o("Retreive object", function () {
    o(obj.getter()).equals(obj);
  });

  o("Retreive property", function () {
    o(obj.getter('bricks')).equals(obj.bricks);
  });

  o("Retreive object by path", function () {
    o(obj.getter('bricks.foo[0]')).equals(obj.bricks.foo[0]);
  });
});
