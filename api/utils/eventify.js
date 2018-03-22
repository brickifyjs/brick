// Based on a previous version of MicroEvent.js found on microjs.com

/*** Extending objects ***/
var Event = function () {
};
Event.prototype = {
  on: function (event, fct) {
    this._events = this._events || {};
    this._events[event] = this._events[event] || [];
    this._events[event].push(fct);
  },
  off: function (event, fct) {
    if (event && fct) {
      this._events = this._events || {};
      if (event in this._events === false) return;
      this._events[event].splice(this._events[event].indexOf(fct), 1);
    } else if (event) {
      delete this._events[event];
    } else {
      this._events = [];
    }
  },
  dispatch: function (event) {
    this._events = this._events || {};
    if (event in this._events === false) return;
    for (var i = 0, len = this._events[event].length; i < len; i++) {
      this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
    }
  }
};

function eventify(destObject, withObject) {
  var props = ['on', 'off', 'dispatch'];
  for (var i = 0, len = props.length; i < len; i++) {
    destObject[props[i]] = Event.prototype[props[i]];
  }

  if (withObject && withObject._events) {
    var events = withObject._events;
    for (var event in events) {
      for (var i = 0, len = events[event].length; i < len; i++) {
        destObject.on.call(destObject, event, events[event][i].bind(destObject));
      }
    }
  }

  return destObject;
};

module.exports = eventify;
