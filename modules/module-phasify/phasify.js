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
  /**
   * Get phases list without stack system
   * */
  getPhases: function (methodName, position, phases) {
    phases = phases || [];
    this._phases = this._phases || {};
    this._phases.down = this._phases.down || {};
    this._phases.up = this._phases.up || {};

    // Get phases from down or up
    if (methodName && position) {
      if (methodName in this._phases[position] === false) return phases;
      for (var i = 0, len = this._phases[position][methodName].length; i < len; i++) {
        phases.push(
          {
            name: methodName,
            position: position,
            hook: this._phases[position][methodName][i].bind(this)
          });
      }
    } else if (methodName && !position) { // Get phases from down and up
      this.getPhases(methodName, 'down', phases);
      this.getPhases(methodName, 'up', phases);
    }
    else if (!methodName && position) { // get all phases from down or up
      for (var hook in this._phases[position]) {
        this.getPhases(hook, position, phases);
      }
    } else {  // get all phases from down and up
      this.getPhases(null, 'down', phases);
      this.getPhases(null, 'up', phases);
    }

    return phases;
  },
  applyPhases: function (methodName) {

    methodName = methodName || this.name;

    this._phases.down = this._phases.down || {};
    this._phases.up = this._phases.up || {};
    this._phases.down[methodName] = this._phases.down[methodName] || [];
    this._phases.up[methodName] = this._phases.up[methodName] || [];

    return new Stack(
      [
        new Stack(this._phases.down[methodName]),
        new Stack(this._phases.up[methodName]),
      ],
      this[methodName] && methodName,
      this[methodName] && this
    );
  }
};

function phasify(destObject) {

  destObject = destObject || this;

  var props = ['down', 'up', 'undown', 'unup', 'applyPhases', 'getPhases'];
  for (var i = 0, len = props.length; i < len; i++) {
    destObject[props[i]] = Phases.prototype[props[i]];
  }

  return destObject;
}

module.exports = phasify;
