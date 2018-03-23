var Stack = require('./Stack');

function Hook() {
}

Hook.prototype = {
  before: function (methodName, fct) {
    console.log('bef', this);

    this._hooks = this._hooks || {};
    this._hooks.before = this._hooks.before || {};
    this._hooks.before[methodName] = this._hooks.before[methodName] || [];
    this._hooks.before[methodName].push(fct);
  },
  after: function (methodName, fct) {
    this._hooks = this._hooks || {};
    this._hooks.after = this._hooks.after || {};
    this._hooks.after[methodName] = this._hooks.after[methodName] || [];
    this._hooks.after[methodName].push(fct);
  },
  unbefore: function (methodName, fct) {
    if (methodName && fct) {
      this._hooks = this._hooks || {};
      if (methodName in this._hooks.before === false) return;
      this._hooks.before[methodName].splice(this._hooks.before[methodName].indexOf(fct), 1);
    } else if (methodName && this._hooks.before) {
      this._hooks.before[methodName] = [];
    } else {
      this._hooks.before = [];
    }
  },
  unafter: function (methodName, fct) {
    if (methodName && fct) {
      this._hooks = this._hooks || {};
      if (methodName in this._hooks.after === false) return;
      this._hooks.after[methodName].splice(this._hooks.after[methodName].indexOf(fct), 1);
    } else if (methodName && this._hooks.after) {
      this._hooks.after[methodName] = [];
    } else {
      this._hooks.after = [];
    }
  },
  applyHooks: function (methodName) {
    this._hooks = this._hooks || {};
    this._hooks.before = this._hooks.before || {};
    this._hooks.after = this._hooks.after || {};
    this._hooks.before[methodName] = this._hooks.before[methodName] || [];
    this._hooks.after[methodName] = this._hooks.after[methodName] || [];

    return new Stack(
      [
        new Stack(this._hooks.before[methodName]),
        new Stack([this[methodName]]),
        new Stack(this._hooks.after[methodName])
      ],
      methodName,
      this
    );
  }
};

function hookify(destObject) {

  destObject = destObject || this;

  var props = ['before', 'after', 'unbefore', 'unafter', 'applyHooks'];
  for (var i = 0, len = props.length; i < len; i++) {
    destObject[props[i]] = Hook.prototype[props[i]];
  }

  return destObject;
}

module.exports = hookify;
