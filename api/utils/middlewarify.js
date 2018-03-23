var Stack = require('./Stack');


function Middleware() {
}

Middleware.prototype = {
  use: function (fct) {
    var methodName = this.name;
    this._middlewares = this._middlewares || {};
    this._middlewares[methodName] = this._middlewares[methodName] || [];
    this._middlewares[methodName].push(this.applyMiddlewareLogic(fct, Array.prototype.slice.call(arguments, 1)));
  },
  unuse: function (methodName, fct) {
    if (methodName && fct) {
      this._middlewares = this._middlewares || {};
      if (methodName in this._middlewares === false) return;
      this._middlewares[methodName].splice(this._middlewares[methodName].indexOf(fct), 1);
    } else if (methodName && this._middlewares) {
      this._middlewares[methodName] = [];
    } else {
      this._middlewares = [];
    }
  },
  applyMiddlewareLogic: function applyMiddlewareLogic(callBack, args) {

    return function () {
      var next = arguments[0];
      var params = Array.prototype.slice.call(arguments);
      var slittedParams = Array.prototype.slice.call(arguments, 1);


      var match = true;
      for (var i = 0, len = args.length; i < len; i++) {
        if (args[i] instanceof RegExp) {
          if (!slittedParams[i].match(args[i])) {
            match = false;
            break;
          }
        } else {
          var arg = typeof args[i] === 'string' ? args[i] : args[i].apply(args[i], slittedParams);

          if (arg !== slittedParams[i] && arg !== true) {
            match = false;
            break;
          }
        }

      }

      match && callBack.apply(callBack, params);
      !match && next(slittedParams);
    }
  },
  applyMiddlewares: function (methodName) {

    methodName = methodName || this.name;

    this._middlewares = this._middlewares || {};
    this._middlewares[methodName] = this._middlewares[methodName] || [];

    var stack = new Stack(
      [
        new Stack(this._middlewares[methodName]),
        new Stack([this[methodName] || this]),
      ],
      this[methodName] && methodName,
      this[methodName] && this
    )

    return stack.start.bind(stack);
  }
};

function middlewarify(destObject) {
  destObject = destObject || this;

  var props = ['use', 'unsuse', 'applyMiddlewares', 'applyMiddlewareLogic'];
  for (var i = 0, len = props.length; i < len; i++) {
    destObject[props[i]] = Middleware.prototype[props[i]];
  }

  return destObject;
}

module.exports = middlewarify;
