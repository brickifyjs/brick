'use strict';

var is = require('../../module-get-type').is;
var getType = require('../../module-get-type').getType;
var types = require('../../module-get-type').types;

/**
 *
 * */
function arrayLookup(arr, options, origin, ctx, index, path, report) {
  ctx = arr;
  reportAndRunCallBack('onArray', options.onArray, arr, options, origin, ctx, index, path, report);

  for (var i = 0, len = arr.length; i < len; i++) {
    var newPath = path + '[' + i + ']';
    reportAndRunCallBack('onWalkingArray', options.onWalkingArray, arr[i], options, origin, ctx, i, newPath, report);

    doWalk(arr[i], options, origin, ctx, i, newPath, report);
  }
}

/**
 *
 * */
function stringLookup(str, options, origin, ctx, index, path, report) {
  reportAndRunCallBack('onString', options.onString, str, options, origin, ctx, index, path, report);

  // Words and characters
  if (options.walkWords) {
    wordsLookup(str, options, origin, ctx, index, path, report);
  }

  if (options.walkCharacters) { // Characters
    charactersLookup(str, options, origin, ctx, index, path, report);
  }
}

/**
 *
 * */
function wordsLookup(str, options, origin, ctx, index, path, report) {
  var words = str.split(' ');
  var position = 0;

  for (var i = 0, len = words.length; i < len; i++) {
    if (i > 0) {
      position += words[i].length + 1;
    }
    var newPath = path + '[' + position + ']';
    reportAndRunCallBack('onWalkingWord', options.onWalkingWord, words[i], options, origin, ctx, position, newPath, report);
  }
}

/**
 *
 * */
function charactersLookup(str, options, origin, ctx, index, path, report) {
  for (var i = 0, len = str.length; i < len; i++) {
    var newPath = path + '[' + i + ']';
    reportAndRunCallBack('onWalkingCharacter', options.onWalkingCharacter, str[i], options, origin, ctx, i, newPath, report);
  }
}

/**
 *
 * */
function objectLookup(obj, options, origin, ctx, index, path, report) {
  ctx = obj;

  reportAndRunCallBack('onObject', options.onObject, obj, options, origin, ctx, index, path, report);

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      var newPath = path + '["' + prop + '"]';
      reportAndRunCallBack('onWalkingObject', options.onWalkingObject, obj[prop], options, origin, ctx, prop, newPath, report);
      doWalk(obj[prop], options, origin, ctx, index, newPath, report);
    }
  }
}

/**
 *
 * */
function fnLookup(obj, options, origin, ctx, index, path, report) {
  ctx = obj;
  reportAndRunCallBack('onFunction', options.onFunction, obj, options, origin, ctx, index, path, report);

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      var newPath = path + '["' + prop + '"]';
      reportAndRunCallBack('onWalkingFunction', options.onWalkingFunction, obj[prop], options, origin, ctx, prop, newPath, report);
      doWalk(obj[prop], options, origin, ctx, index, newPath, report);
    }
  }
}

/**
 *
 * */
function createReport(cbName, cb, obj, origin, ctx, index, path) {
  return {
    origin: origin,
    cbName: cbName,
    callback: cb,
    obj: obj,
    ctx: ctx,
    index: index,
    path: path,
    type: getType(obj)
  };
}

/**
 *
 * */
function addReport(report, data) {
  report.push(data);
}

/**
 *
 * */
function withParams(cb, obj, origin, ctx, index, path, report) {
  return cb && function () {
    cb(obj, origin, ctx, index, path, report);
  };
}

/**
 *
 * */
function reportAndRunCallBack(cbName, cb, obj, options, origin, ctx, index, path, report) {
  cb = withParams(cb, obj, origin, ctx, index, path, report);
  addReport(report, createReport(cbName, cb, obj, origin, ctx, index, path));
  !options.silent && cb && cb();
}

/**
 * silent
 * walkArrays
 * walkObjects
 * walkFunctions
 * walkXXX
 * walkWords (strings)
 * walkCharacters (strings)
 * */
function doWalk(obj, options, origin, ctx, index, path, report) {
  if (is.array(obj) && options.walkArrays) {
    arrayLookup(obj, options, origin, ctx, index, path, report);
  } else if (is.object(obj) && options.walkObjects) {
    objectLookup(obj, options, origin, ctx, index, path, report);
  } else if (is.string(obj) && ( options.walkWords || options.walkCharacters)) {
    stringLookup(obj, options, origin, ctx, index, path, report);
  } else if (is.number(obj) && options.walkNumber) {
    reportAndRunCallBack('onNumber', options.onNumber, obj, options, origin, ctx, index, path, report);
  } else if (is.boolean(obj) && options.walkBoolean) {
    reportAndRunCallBack('onBoolean', options.onBoolean, obj, options, origin, ctx, index, path, report);
  } else if (is.function(obj) && options.walkFunctions) {
    fnLookup(obj, options, origin, ctx, index, path, report);
  } else if (is.null(obj) && options.walkNull) {
    reportAndRunCallBack('onNull', options.onNull, obj, options, origin, ctx, index, path, report);
  } else if (is.undefined(obj) && options.walkUndefined) {
    reportAndRunCallBack('onUndefined', options.onUndefined, obj, options, origin, ctx, index, path, report);
  } else if (is.nan(obj) && options.walkNaN) {
    reportAndRunCallBack('onNaN', options.onNaN, obj, options, origin, ctx, index, path, report);
  } else if (is.regexp(obj) && options.walkRegex) {
    reportAndRunCallBack('onRegex', options.onRegex, obj, options, origin, ctx, index, path, report);
  }

  return report;
}

/**
 *
 * */
function walk(obj, options) {
  var report = [];
  report.types = types;

  var opts = Object.assign({
    silent: true,
    walkArrays: true,
    walkObjects: true,
    walkFunctions: false,
    walkWords: false,
    walkCharacters: false,
    walkRegex: false,
    walkNaN: false,
    walkBoolean: false,
    walkUndefined: false,
    walkNull: false,
    walkNumber: false
  }, options);

  return doWalk(obj, opts, obj, obj, 0, '', report);
}

module.exports = walk;
