'use strict';

var o = require('ospec');
var eventify = require('../eventify');

o.spec('eventify', function () {
  var store = {
    count: 0
  };

  function Store() {
    this.count = 0;
  }

  Store.prototype.count = 0;

  eventify(store);
  eventify(Store);

  o('Can attach event system', function () {
    o(typeof store.on).equals('function');
    o(typeof store.off).equals('function');
    o(typeof store.dispatch).equals('function');
    o(typeof store._events).equals('object');
  });

  o('Can define events on prototype', function (done) {
    var store = new Store();

    var fn = function (int) {

      Store.prototype.count += int;
      o(Store).equals(this);
      o(Store.prototype.count).equals(10);

      Store.off('increment', fn);

      done();
    };

    Store.on('increment', fn);

    Store.dispatch('increment', 10);
  });

  o('Can define events on object', function () {
    store.on('increment', function () {
    });

    o(store._events.increment.length).equals(1);
  });

  o('Can define events on instance', function (done) {
    var store = new Store();
    eventify(store);
    store.on('increment', function (int) {
      this.count += int;
      o(store).equals(this);
      o(this.count).equals(10);

      done();
    });

    store.dispatch('increment', 10);
  });

  o('Can dispatch events', function (done) {
    store.on('increment', function (int) {
      this.count += int;
      o(store).equals(this);
      o(this.count).equals(10);

      done();
    });

    store.dispatch('increment', 10);
  });

  o.spec('Can get events without dispatch', function () {

    function foo() {
    }

    store.on('foo', foo);
    store.on('foo', function () {
    });

    o('By event', function () {
      var events = store.getEvents('foo');
      o(events.length).equals(2);
    });

    o('All events', function () {
      var events = store.getEvents();
      o(events.length).equals(6);
    });

    o('Event report should be an object', function () {
      var events = store.getEvents();
      o(events[0].hasOwnProperty('name')).equals(true);
      o(events[0].hasOwnProperty('event')).equals(true);
    });

  });

  o.spec('Can remove events', function () {
    function decrement() {
    }

    store.on('decrement', decrement);
    store.on('decrement', function () {
    });

    o('By event', function () {
      store.off('increment');
      o(store._events.increment).equals(undefined);
    });

    o('By callback', function () {
      store.off('decrement', decrement);
      o(store._events.decrement.length).equals(1);
    });

    o('All in one', function () {
      store.off();
      o(Object.keys(store._events).length).equals(0);
    });
  });
});