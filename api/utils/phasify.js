var Stack = require('./Stack');

function Phases() {
}

Phases.prototype = {
  down: function (methodName, fct) {
    this._phases = this._phases || {};
    this._phases.down = this._phases.down || {};
    this._phases.down[methodName] = this._phases.down[methodName] || [];
    this._phases.down[methodName].push(fct);
  },
  up: function (methodName, fct) {
    this._phases = this._phases || {};
    this._phases.up = this._phases.up || {};
    this._phases.up[methodName] = this._phases.up[methodName] || [];
    this._phases.up[methodName].push(fct);
  },
  undown: function (methodName, fct) {
    if (methodName && fct) {
      this._phases = this._phases || {};
      if (methodName in this._phases.down === false) return;
      this._phases.down[methodName].splice(this._phases.down[methodName].indexOf(fct), 1);
    } else if (methodName && this._phases.down) {
      this._phases.down[methodName] = [];
    } else {
      this._phases.down = [];
    }
  },
  unup: function (methodName, fct) {
    if (methodName && fct) {
      this._phases = this._phases || {};
      if (methodName in this._phases.up === false) return;
      this._phases.up[methodName].splice(this._phases.up[methodName].indexOf(fct), 1);
    } else if (methodName && this._phases.up) {
      this._phases.up[methodName] = [];
    } else {
      this._phases.up = [];
    }
  },
  applyPhases: function (methodName) {
    this._phases.down = this._phases.down || {};
    this._phases.up = this._phases.up  || {};
    this._phases.down[methodName] = this._phases.down[methodName] || [];
    this._phases.up[methodName] = this._phases.up[methodName]  || [];

    return new Stack(
      [
        new Stack(this._phases.down[methodName]),
        new Stack(this._phases.up[methodName]),
      ]
    );
  }
};

function phasify(destObject) {

  destObject = destObject || this;

  var props = ['down', 'up', 'undown', 'unup', 'applyPhases'];
  for (var i = 0, len = props.length; i < len; i++) {
    destObject[props[i]] = Phases.prototype[props[i]];
  }

  return destObject;
}

module.exports = phasify;
