'use strict';

var Brick = require('../lifecycle/create');

var C = 'constructor',
    X = 'extends',
    BrickConstructor = Brick;

// Class
Brick[X] = function (subclassFactory) {
    var prototype = Object.create(this.prototype);

    subclassFactory.call(prototype, this.prototype);

    function Brick() {
        (prototype[C] || BrickConstructor).apply(this, arguments);
    }

    Object.defineProperty(Brick, 'name', {
        writable: true
    });

    Brick.prototype = prototype;
    Brick[X] = this[X];

    return Brick;
};

module.exports = Brick;