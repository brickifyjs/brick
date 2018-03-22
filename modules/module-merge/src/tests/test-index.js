'use strict';

var o = require('ospec');
var merge = require('../index');

/*
* Merge stragegy
*
* keepExistingValues
* eraseMethods
* eraseValues (string,boulean,undefined,null)
* eraseArray
* eraseObjects
* eraseNotSameType
*
* */

o.spec('merge', function () {
  o('Merge not same type', function () {
    var a = 1;
    var b = null;

    o(merge(a, b)).equals(b);
  });

  o('Merge object not immutable', function () {
    var a = {foo: 'foo'};
    var b = {bar: 'bar'};
    o(merge(a, b)).equals(a);
  });

  o('Merge object immutable', function () {
    var a = {foo: 'foo'};
    var b = {bar: 'bar'};
    var c = merge(a, b, {immutable: true});
    o(c !== a).equals(true);
  });

  o('Merge objects erasing objects', function () {
    var a = {foo: 'foo'};
    var b = {bar: 'bar'};

    o(merge(a, b, {eraseObject: true})).equals(b);
  });

  o('Merge objects and not keep existing values', function () {
    var a = {foo: 'foo'};
    var b = {bar: 'bar2'};
    o(merge(a, b, {keepExistingValues: false})).equals(b);
  });

  o('Merge objects and keep existing values', function () {
    var a = {foo: 'foo'};
    var b = {bar: 'bar'};
    o(merge(a, b).hasOwnProperty('foo')).equals(true);
  });

  o('Merge objects', function () {
    var a = {foo: 'foo'};
    var b = {foo: 'foo2', bar: 'bar'};
    o(merge(a, b).toString()).equals(b.toString());
  });

  o('Merge objects and not erase values', function () {
    var a = {foo: 'foo'};
    var b = {foo: 'foo2', bar: 'bar'};
    o(merge(a, b, {eraseValues: false}).toString()).equals({foo: 'foo', bar: 'bar'}.toString());
  });


  o('Merge array < length', function () {
    var a = [0];
    var b = [0, 1];
    o(merge(a, b)).equals(a);
  });

  o('Merge array > length', function () {
    var a = [0, 1];
    var b = [0];
    o(merge(a, b)).equals(a);
  });

  o('Merge array < length and not keepExistingValues', function () {
    var a = [0];
    var b = [0, 1];
    o(merge(a, b, {keepExistingValues: false})).equals(a);
  });

  o('Merge array > length and not keepExistingValues', function () {
    var a = [0, 1];
    var b = [0];
    o(merge(a, b, {keepExistingValues: false})).equals(a);
  });

  o('Merge array not immutable', function () {
    var a = [0];
    var b = [0];
    o(merge(a, b)).equals(a);
  });

  o('Merge array immutable', function () {
    var a = [0, 1, 2];
    var b = [0, 1, 2, 3];
    var c = merge(a, b, {immutable: true});
    o(c !== a).equals(true);
  });

  o('Merge methods', function () {
    var a = function () {
    };
    a.foo = true;
    var b = function () {
    };
    o(merge(a, b).hasOwnProperty('foo')).equals(true);
  });

  o('eraseArray', function () {
    var a = [0, 1, 2];
    var b = [0, 1, 2, 3];
    o(merge(a, b, {eraseArray: true})).equals(b);
  });

  o('eraseArray immutable', function () {
    var a = [0, 1, 2];
    var b = [0, 1, 2, 3];
    var c = merge(a, b, {eraseArray: true, immutable: true});
    o(c !== a).equals(true);
  });

  o('eraseObject', function () {
    var a = {foo: 'foo'};
    var b = {bar: 'bar'};
    o(merge(a, b, {eraseObject: true})).equals(b);
  });

  o('eraseObject immutable', function () {
    var a = {foo: 'foo'};
    var b = {bar: 'bar'};
    var c = merge(a, b, {eraseObject: true, immutable: true});
    o(c !== a).equals(true);
  });
});
