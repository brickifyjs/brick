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
      this._hooks.before = this._hooks.before || {};
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
      this._hooks.after = this._hooks.after || {};
      if (methodName in this._hooks.after === false) return;
      this._hooks.after[methodName].splice(this._hooks.after[methodName].indexOf(fct), 1);
    } else if (methodName && this._hooks.after) {
      this._hooks.after[methodName] = [];
    } else {
      this._hooks.after = [];
    }
  },
  /**
   * Get hooks list without stack system
   * */
  getHooks: function (methodName, position, hooks) {
    hooks = hooks || [];
    this._hooks = this._hooks || {};
    this._hooks.before = this._hooks.before || {};
    this._hooks.after = this._hooks.after || {};

    // Get hooks from before or after
    if (methodName && position) {
      if (methodName in this._hooks[position] === false) return hooks;
      for (var i = 0, len = this._hooks[position][methodName].length; i < len; i++) {
        hooks.push(
          {
            name: methodName,
            position: position,
            hook: this._hooks[position][methodName][i].bind(this)
          });
      }
    } else if (methodName && !position) { // Get hooks from before and after
      this.getHooks(methodName, 'before', hooks);
      this.getHooks(methodName, 'after', hooks);
    }
    else if (!methodName && position) { // get all hooks from before or after
      for (var hook in this._hooks[position]) {
        this.getHooks(hook, position, hooks);
      }
    } else {  // get all hooks from before and after
      this.getHooks(null, 'before', hooks);
      this.getHooks(null, 'after', hooks);
    }

    return hooks;
  },
  applyHooks: function (methodName) {

    methodName = methodName || this.name;

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
      this[methodName] && methodName,
      this[methodName] && this
    );
  }
};

function hookify(destObject) {

  destObject = destObject || this;

  var props = ['before', 'after', 'unbefore', 'unafter', 'applyHooks', 'getHooks'];
  for (var i = 0, len = props.length; i < len; i++) {
    destObject[props[i]] = Hook.prototype[props[i]];
  }

  return destObject;
}

module.exports = hookify;
