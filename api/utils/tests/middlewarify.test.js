'use strict';

var o = require('ospec');
var middlewarify = require('../middlewarify');

o.spec('middlewarify', function () {
  function get(next, url) {
    console.log('origin', url);
    next(url);
  }

  o('a', function () {
    middlewarify(get);

    get.use(function (next, url) {
      console.log('global mw', url);
      next(url);
    });

    get.use(function (next, url) {
      console.log('url mw', url);
      next(url);
    }, 'https://www.google.fr');

    get.use(function (next, url) {
      console.log('reg mw', url);
      next(url);
    }, /^https:\/\/www.goo/);

    get.use(function (next, url) {
      console.log('fn mw', url);
      next(url);
    }, function () {
      return true;
    });

    get = get.applyMiddlewares();

    get('https://www.google.fr');
  });
});

// todo logic ou default + inverse
