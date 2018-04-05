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
      this._events = {};
    }
  },
  dispatch: function (event) {
    this._events = this._events || {};
    if (event in this._events === false) return;
    for (var i = 0, len = this._events[event].length; i < len; i++) {
      this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
    }
  },
  getEvents: function (event, events) {
    events = events || [];
    this._events = this._events || {};

    if (event) { // get events of specific event name
      if (event in this._events === false) return events;
      for (var i = 0, len = this._events[event].length; i < len; i++) {
        events.push(
          {
            name: event,
            event: this._events[event][i].bind(this)
          });
      }
    } else { // get all events
      for (var event in this._events) {
        this.getEvents(event, events);
      }
    }

    return events;
  }
};

function eventify(destObject) {
  destObject = destObject || this;

  var props = ['on', 'off', 'dispatch', 'getEvents'];
  for (var i = 0, len = props.length; i < len; i++) {
    destObject[props[i]] = Event.prototype[props[i]];
  }

  return destObject;
};

module.exports = eventify;
