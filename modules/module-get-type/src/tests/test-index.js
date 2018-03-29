'use strict';

var o = require('ospec');
var getType = require('../index').getType;
var types = require('../index').types;
var is = require('../index').is;

o.spec('get-types', function () {
  o('Should get type', function () {
    o(getType(
      function () {
      }
    )).equals(types.FUNCTION);

    o(getType(
      {}
    )).equals(types.OBJECT);

    o(getType(
      []
    )).equals(types.ARRAY);

    o(getType(
      ''
    )).equals(types.STRING);

    o(getType(
      0
    )).equals(types.NUMBER);

    o(getType(
      NaN
    )).equals(types.NAN);

    o(getType(
      /^/
    )).equals(types.REGEXP);

    o(getType(
      null
    )).equals(types.NULL);

    o(getType(
      'undefined'
    )).equals(types.UNDEFINED);

    o(getType(
      true
    )).equals(types.BOOLEAN);
  });

  o('Should check type', function () {
    o(is.boolean(true)).equals(true);
    o(is.function(function () {
    })).equals(true);
    o(is.object({})).equals(true);
    o(is.array([])).equals(true);
    o(is.string('')).equals(true);
    o(is.number(1)).equals(true);
    o(is.nan(NaN)).equals(true);
    o(is.null(null)).equals(true);
    o(is.undefined('undefined')).equals(true);
    o(is.regexp(/^/)).equals(true);
    o(is.sameType(0, 1)).equals(true);
  });
});
