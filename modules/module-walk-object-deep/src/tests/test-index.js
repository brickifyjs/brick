'use strict';

var o = require('ospec');
var walk = require('../index');
var types = require('../../../module-get-type').types;

o.spec('walk', function () {
  o('Walk should return an array of report', function () {
    var report = walk([]);

    o(report instanceof Array).equals(true);
  });

  o('Report should return types', function () {
    var report = walk([]);

    o(report.types).equals(types);
  });

  o('Report entry should be an object', function () {
    var report = walk([]);

    o(report[0].hasOwnProperty('origin')).equals(true);
    o(report[0].hasOwnProperty('cbName')).equals(true);
    o(report[0].hasOwnProperty('callback')).equals(true);
    o(report[0].hasOwnProperty('obj')).equals(true);
    o(report[0].hasOwnProperty('index')).equals(true);
    o(report[0].hasOwnProperty('path')).equals(true);
    o(report[0].hasOwnProperty('type')).equals(true);
  });

  o('Should not report boolean by default', function () {
    o(walk(true).length).equals(0);
  });

  o('Should report boolean', function () {
    o(walk(true, {walkBoolean: true}).length).equals(1);
  });


  o('Should not report undefined by default', function () {
    o(walk(undefined).length).equals(0);
  });

  o('Should report undefined', function () {
    o(walk(undefined, {walkUndefined: true}).length).equals(1);
  });


  o('Should not report null by default', function () {
    o(walk(null).length).equals(0);
  });

  o('Should report null', function () {
    o(walk(null, {walkNull: true}).length).equals(1);
  });


  o('Should not report NaN by default', function () {
    o(walk(NaN).length).equals(0);
  });

  o('Should report NaN', function () {
    o(walk(NaN, {walkNaN: true}).length).equals(1);
  });

  o('Should not report numbers by default', function () {
    o(walk(1).length).equals(0);
  });

  o('Should report numbers', function () {
    o(walk(1, {walkNumber: true}).length).equals(1);
  });


  o('Should not report Regexp by default', function () {
    o(walk(/^/).length).equals(0);
  });

  o('Should report Regexp', function () {
    o(walk(/^/, {walkRegex: true}).length).equals(1);
  });

  o('Should no report strings by default', function () {
    o(walk('foo').length === 0).equals(true);
  });

  o('Should not report functions by default', function () {
    o(walk(function () {
    }).length === 0).equals(true);
  });

  o('Should report arrays', function () {
    o(walk([1]).length).equals(2);
  });

  o('Should report objects', function () {
    o(walk({
      foo: true
    }).length).equals(2);
  });

  o('Should have an option to walk function', function () {
    var fn = function () {
    };

    fn.foo = function () {

    };

    o(walk(fn, {walkFunctions: true}).length).equals(3);
  });


  o('Should have an option to walk string characters', function () {
    o(walk('a', {walkCharacters: true}).length).equals(2);
  });

  o('Should have an option to walk string words', function () {
    o(walk('foo', {walkWords: true}).length).equals(2);
  });

  o('Should run callbacks on report with silent to false', function (done) {
    var i = 0;

    function checkDone() {
      i++;
      if (i === 23) {
        return done();
      }
    }

    var opts = {
      onArray: checkDone,
      onWalkingArray: checkDone,
      onObject: checkDone,
      onWalkingObject: checkDone,
      onWalkingFunction: checkDone,
      onWalkingCharacter: checkDone,
      onWalkingWord: checkDone,
      onString: checkDone,
      onNumber: checkDone,
      onFunction: checkDone,
      onBoolean: checkDone,
      onNull: checkDone,
      onUndefined: checkDone,
      onNaN: checkDone,
      onRegex: checkDone,
      silent: false,
      walkFunctions: true,
      walkRegex: true,
      walkNaN: true,
      walkBoolean: true,
      walkUndefined: true,
      walkNull: true,
      walkNumber: true
    };

    var obj = {
      foo: [NaN, null, 'str', 0, undefined, true, /^/, function () {
      }]
    };

    walk(obj, opts);
  });

  o('Report array should complied to object data', function () {
    var obj = [[1]];
    var report = walk(obj)[3];

    o(report.origin).equals(obj);
    o(report.cbName).equals('onWalkingArray');
    o(report.callback).equals(undefined);
    o(report.obj).equals(obj[0][0]);
    o(report.ctx).equals(obj[0]);
    o(report.index).equals(0);
    o(report.path).equals('[0][0]');
    o(report.type).equals('number');
  });

  o('Report object should complied to object data', function () {
    var obj = {
      foo: {
        bar: [1]
      }
    };
    var report = walk(obj)[5];


    o(report.origin).equals(obj);
    o(report.cbName).equals('onWalkingArray');
    o(report.callback).equals(undefined);
    o(report.obj).equals(1);
    o(report.ctx).equals(obj.foo.bar);
    o(report.index).equals(0);
    o(report.path).equals('["foo"]["bar"][0]');
    o(report.type).equals('number');
  });

  o('Report function should complied to object data', function () {
    var obj = function () {

    };
    obj.foo = [1];

    var report = walk(obj, {walkFunctions: true})[3];


    o(report.origin).equals(obj);
    o(report.cbName).equals('onWalkingArray');
    o(report.callback).equals(undefined);
    o(report.obj).equals(1);
    o(report.ctx).equals(obj.foo);
    o(report.index).equals(0);
    o(report.path).equals('["foo"][0]');
    o(report.type).equals('number');
  });

  o('Report string words should complied to object data', function () {
    var obj = 'foo bar';
    var report = walk(obj, {walkCharacters: true})[7];

    o(report.origin).equals(obj);
    o(report.cbName).equals('onWalkingCharacter');
    o(report.callback).equals(undefined);
    o(report.obj).equals('r');
    o(report.ctx).equals(obj);
    o(report.index).equals(6);
    o(report.path).equals('[6]');
    o(report.type).equals('string');
  });
});
