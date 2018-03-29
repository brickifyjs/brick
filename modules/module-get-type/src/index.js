'use strict';

var INSTANCE_OBJECT = Object;
var INSTANCE_REGEXP = RegExp;
var CONSTRUCTOR_ARRAY = Array;

var types = {
  BOOLEAN: 'boolean',
  FUNCTION: 'function',
  OBJECT: 'object',
  ARRAY: 'array',
  STRING: 'string',
  NUMBER: 'number',
  NAN: 'nan',
  NULL: 'null',
  UNDEFINED: 'undefined',
  REGEXP: 'regexp'
};

function getType(obj) {
  if (obj === null) {
    return types.NULL;
  } else if (typeof obj === types.FUNCTION) {
    return types.FUNCTION;
  } else if (obj instanceof INSTANCE_REGEXP) {
    return types.REGEXP;
  } else if (obj && obj.constructor === CONSTRUCTOR_ARRAY) {
    return types.ARRAY;
  } else if (typeof obj === types.OBJECT && obj instanceof INSTANCE_OBJECT) {
    return types.OBJECT;
  } else if (obj === types.UNDEFINED || obj === undefined) {
    return types.UNDEFINED;
  } else if (typeof obj === types.STRING) {
    return types.STRING;
  } else if (obj.toString() === 'NaN') {
    return types.NAN;
  } else if (typeof obj === types.NUMBER) {
    return types.NUMBER;
  } else if (typeof obj === types.BOOLEAN) {
    return types.BOOLEAN;
  }
}

var is = {
  boolean: function (obj) {
    return getType(obj) === types.BOOLEAN;
  },
  function: function (obj) {
    return getType(obj) === types.FUNCTION;
  },
  object: function (obj) {
    return getType(obj) === types.OBJECT;
  },
  array: function (obj) {
    return getType(obj) === types.ARRAY;
  },
  string: function (obj) {
    return getType(obj) === types.STRING;
  },
  number: function (obj) {
    return getType(obj) === types.NUMBER;
  },
  nan: function (obj) {
    return getType(obj) === types.NAN;
  },
  null: function (obj) {
    return getType(obj) === types.NULL;
  },
  undefined: function (obj) {
    return getType(obj) === types.UNDEFINED;
  },
  regexp: function (obj) {
    return getType(obj) === types.REGEXP;
  },
  sameType: function (obj1, obj2) {
    return getType(obj1) === getType(obj2);
  }
};

module.exports = {
  getType: getType,
  is: is,
  types: types
};
