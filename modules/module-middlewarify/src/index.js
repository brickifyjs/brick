var Stack = require('../../module-stack');

var TYPE_STRING = 'string';
var TYPE_FUNCTION = 'function';
var REGEXP = RegExp;

function Middleware() {
}

Middleware.prototype = {
  use: function (query, callBackMatched, callBackNotMatched) {
    var methodName = this.name;

    this._middlewares = this._middlewares || {};
    this._middlewares[methodName] = this._middlewares[methodName] || [];
    this._middlewares[methodName].push(this.applyMiddlewareLogic(query, callBackMatched, callBackNotMatched));
  },
  applyMiddlewareLogic: function applyMiddlewareLogic(query, callBackMatched, callBackNotMatched) {

    var that = this;

    return function () {
      var next = arguments[0];
      var matched = false;

      var params = Array.prototype.slice.call(arguments);
      var slittedParams = Array.prototype.slice.call(arguments, 1);

      // Global middleware
      if (!callBackMatched) {
        return query.apply(query, params);
      }

      if (typeof query === TYPE_STRING) {
        matched = that._middlewaresLogic && that._middlewaresLogic.apply(that._middlewaresLogic, slittedParams);
      } else if (query instanceof REGEXP) {
        matched = slittedParams[0].match(query);
      } else if (typeof query === TYPE_FUNCTION) {
        matched = query.apply(query, slittedParams);
      }

      return matched ? callBackMatched.apply(callBackMatched, params) : callBackNotMatched ? callBackNotMatched.apply(callBackNotMatched, params) : next(slittedParams);
    }
  },
  getMiddlewares: function (methodName, middlewares) {
    middlewares = middlewares || [];
    this._middlewares = this._middlewares || {};

    if (mw) { // get middlewares of specific mw name
      if (mw in this._middlewares === false) return middlewares;
      for (var i = 0, len = this._middlewares[mw].length; i < len; i++) {
        middlewares.push(
          {
            name: mw,
            mw: this._middlewares[mw][i].bind(this)
          });
      }
    } else { // get all middlewares
      for (var mw in this._middlewares) {
        this.getMiddlewares(mw);
      }
    }

    return middlewares;
  },
  applyMiddlewares: function (logic, methodName) {

    if (typeof logic === TYPE_STRING) {
      methodName = logic;
      logic = null;
    }

    methodName = methodName || this.name;


    this._middlewares = this._middlewares || {};
    this._middlewares[methodName] = this._middlewares[methodName] || [];

    var bound = this[methodName] || this;

    var stack = new Stack(
      [
        new Stack(this._middlewares[methodName]),
        new Stack([bound]),
      ],
      this[methodName] && methodName,
      this[methodName] && this
    )

    bound._middlewaresLogic = logic;

    return stack.start.bind(stack);
  }
};

function middlewarify(destObject) {
  destObject = destObject || this;

  var props = ['use', 'applyMiddlewares', 'applyMiddlewareLogic', 'getMiddlewares'];
  for (var i = 0, len = props.length; i < len; i++) {
    destObject[props[i]] = Middleware.prototype[props[i]];
  }
  return destObject;
}

module.exports = middlewarify;
