'use strict';

var TYPE_FUNCTION = 'function';
var TYPE_OBJECT = 'object';
var TYPE_ARRAY = 'Array';
var INSTANCE_OBJECT = Object;
var CONSTRUCTOR_ARRAY = Array;

function getType(obj) {
  if (typeof obj === TYPE_FUNCTION) {
    return TYPE_FUNCTION;
  } else if (obj && obj.constructor === CONSTRUCTOR_ARRAY) {
    return TYPE_ARRAY;
  } else if (typeof obj === TYPE_OBJECT && obj instanceof INSTANCE_OBJECT) {
    return TYPE_OBJECT;
  }

  return null;
}

function lookup(sourceLength, targetLength, source, target, options) {
  if (sourceLength === targetLength) {
    var sourceType = getType(source);
    var targetType = getType(target);
    var prop;

    for (prop in source) {
      if (options.keepExistingValues && sourceType === targetType && sourceType === TYPE_OBJECT && !(target.hasOwnProperty(prop))) {
        source = INSTANCE_OBJECT.assign(source, target);
      } else if (!options.keepExistingValues && sourceType === targetType && sourceType === TYPE_OBJECT && !(target.hasOwnProperty(prop))) {
        source = target;
      } else {
        source[prop] = merge(source[prop], target[prop], options);
      }
    }
  } else if (sourceLength < targetLength) {
    for (prop in target) {
      if (source.hasOwnProperty(prop)) {
        source[prop] = merge(source[prop], target[prop], options);
      } else {
        source[prop] = target[prop];
      }
    }
  } else if (sourceLength > targetLength) {
    for (prop in source) {
      if (target.hasOwnProperty(prop)) {
        source[prop] = merge(source[prop], target[prop], options);
      } else if (!options.keepExistingValues) {
        delete source[prop];
      }
    }
  }

  return source;
}

function arrayLookup(source, target, options) {
  var sourceLength = source.length;
  var targetLength = target.length;

  return lookup(sourceLength, targetLength, source, target, options);
}

function objectLookup(source, target, options) {
  var sourceLength = Object.keys(source).length;
  var targetLength = Object.keys(target).length;

  return lookup(sourceLength, targetLength, source, target, options);
}

function merge(source, target, options) {
  var typeSource = getType(source);
  var typeTarget = getType(target);

  options = INSTANCE_OBJECT.assign({
    immutable: false,
    keepExistingValues: true,
    eraseMethods: true,
    eraseValues: true,
    eraseNotSameType: true,
    eraseArray: false,
    eraseObject: false
  }, options || {});

  var originalSource = source;

  if (typeSource === TYPE_FUNCTION) {
    if (options.eraseMethods || (typeSource !== typeTarget && options.eraseNotSameType)) {
      source = target;
    }

    for (var prop in originalSource) {
      if (originalSource.hasOwnProperty(prop)) {
        source[prop] = objectLookup(originalSource, target, options);
      }
    }
  } else if (typeSource === TYPE_ARRAY) {
    originalSource = source.slice();
    if (options.eraseArray || (typeSource !== typeTarget && options.eraseNotSameType)) {
      source = target;
    } else {
      source = options.immutable ? arrayLookup(originalSource, target, options) : arrayLookup(source, target, options);
    }
  } else if (typeSource === TYPE_OBJECT) {
    if (options.eraseObject || (typeSource !== typeTarget && options.eraseNotSameType)) {
      source = target;
    } else {
      source = options.immutable ? INSTANCE_OBJECT.assign({}, source, target, options) : objectLookup(source, target, options);
    }
  } else if (options.eraseValues) {
    // string || boolean || undefined || null
    source = target;
  }

  return source;
}

module.exports = merge;
