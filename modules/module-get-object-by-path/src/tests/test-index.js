/* global window */
/* global global */
/* global process */

'use strict';

var o = require('ospec');
var getObjectByPath = require('../index');

var obj = {
  foo: {
    bar: [[{
      baz: function () {
      }
    }]]
  }
};

o.spec('getObjectByPath', function () {
  o('Path and context works', function () {
    var path = 'foo.bar[0][0].baz';
    var objectDescription = getObjectByPath(path, obj);

    o(typeof objectDescription).equals('object');
    o(objectDescription.hasOwnProperty('context')).equals(true);
    o(objectDescription.context).equals(obj);
    o(objectDescription.hasOwnProperty('paths')).equals(true);
    o(objectDescription.paths.first).equals('foo');
    o(objectDescription.paths.last).equals('baz');
    o(objectDescription.paths.decomposed.join('')).equals('foobar00baz');
    o(objectDescription.hasOwnProperty('object')).equals(true);
    o(objectDescription.object.first).equals(obj);
    o(objectDescription.object.last).equals(obj.foo.bar[0][0].baz);
    o(objectDescription.object.decomposed.indexOf(obj) > -1).equals(true);
    o(objectDescription.object.decomposed.indexOf(obj.foo) > -1).equals(true);
    o(objectDescription.object.decomposed.indexOf(obj.foo.bar[0]) > -1).equals(true);
    o(objectDescription.object.decomposed.indexOf(obj.foo.bar[0][0]) > -1).equals(true);
    o(objectDescription.object.decomposed.indexOf(obj.foo.bar[0][0].baz) > -1).equals(true);
  });

  o('Path without context works', function () {
    var path = 'obj.foo.bar[0][0].baz';

    process.obj = obj;

    var objectDescription = getObjectByPath(path);

    o(typeof objectDescription).equals('object');
    o(objectDescription.hasOwnProperty('context')).equals(true);
    o(objectDescription.context).equals(process);
    o(objectDescription.hasOwnProperty('paths')).equals(true);
    o(objectDescription.paths.first).equals('obj');
    o(objectDescription.paths.last).equals('baz');
    o(objectDescription.paths.decomposed.join('')).equals('objfoobar00baz');
    o(objectDescription.hasOwnProperty('object')).equals(true);
    o(objectDescription.object.first).equals(process);
    o(objectDescription.object.last).equals(obj.foo.bar[0][0].baz);
    o(objectDescription.object.decomposed.indexOf(process) > -1).equals(true);
    o(objectDescription.object.decomposed.indexOf(obj) > -1).equals(true);
    o(objectDescription.object.decomposed.indexOf(obj.foo) > -1).equals(true);
    o(objectDescription.object.decomposed.indexOf(obj.foo.bar[0]) > -1).equals(true);
    o(objectDescription.object.decomposed.indexOf(obj.foo.bar[0][0]) > -1).equals(true);
    o(objectDescription.object.decomposed.indexOf(obj.foo.bar[0][0].baz) > -1).equals(true);
  });


  o('Path and context not found works', function () {
    var path = 'foo.bar[1].baz';
    var objectDescription = getObjectByPath(path, obj);

    o(typeof objectDescription).equals('object');
    o(objectDescription).equals(null);
  });
});
