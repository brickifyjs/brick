/* global window */
/* global global */
/* global process */
'use strict';

function lookup(context, splittedPath, i, decomposedObject, decomposedPath) {
  if (decomposedObject.indexOf(context) === -1) {
    decomposedObject.push(context);
  }

  if (context && i < splittedPath.length - 1) {
    var asArrayIndex = splittedPath[i].indexOf('[');
    if (asArrayIndex === -1) {
      if (context && context.hasOwnProperty(splittedPath[i])) {
        context = context[splittedPath[i]];
        decomposedPath.push(splittedPath[i]);
        return lookup(context, splittedPath, i + 1, decomposedObject, decomposedPath);
      }
    } else {
      var indexes = splittedPath[i].match(/\[.\]/g);
      var computedPath = splittedPath[i].replace(indexes.join(''), '');
      decomposedPath.push(computedPath);

      context = context[computedPath];
      for (var j = 0, len = indexes.length; j < len; j++) {
        var path = indexes[j].replace('[', '').replace(']', '');
        context = context && context[path];
        if (!context) {
          break;
        }
        decomposedPath.push(path);
        decomposedObject.push(context);
      }

      return lookup(context, splittedPath, i + 1, decomposedObject, decomposedPath);
    }
  }

  return context;
}


function getObjectByPath(path, context) {
  var decomposedObject = [];
  var decomposedPath = [];

  if (!context && typeof process !== 'undefined') {
    context = process;
  }   /* istanbul ignore if */ else if (!context && typeof global !== 'undefined') {
    context = global;
  }   /* istanbul ignore if */ else if (!context && typeof window !== 'undefined') {
    context = window;
  }

  var splittedPath = path
    .replace(/\[/g,'.')
    .replace(/\]/g,'.')
    .replace(/\.{2,}/,'.')
    .replace(/\.$/,'')
    .split('.');

  var lastPath = splittedPath[splittedPath.length - 1];
  var objPath = lookup(context, splittedPath, 0, decomposedObject, decomposedPath);

  objPath && objPath[lastPath] && decomposedObject.push(objPath[lastPath]);
  objPath && objPath[lastPath] && decomposedPath.push(lastPath);

  return !objPath || !objPath[lastPath] ? null : {
    context: context,
    object: {
      decomposed: decomposedObject,
      first: context,
      last: objPath[lastPath],
      parent: objPath
    },
    paths: {
      decomposed: decomposedPath,
      first: splittedPath[0],
      last: lastPath
    }
  };
}

module.exports = getObjectByPath;
