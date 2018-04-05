'use strict';

var o = require('ospec');
var middlewarify = require('../index');

o.spec('middlewarify', function () {

  // TODO TESTS

  // bind value to matched logic there
  function get(next, url) {
    console.log('origin', url);
    next(url);
  }

  o('test', function () {
    middlewarify(get);

    //err,req, res, next, else
    get.use(function (next, url) {
      console.log('global mw', url);
      next(url);
    });

    get.use('https://www.google.fr', function (next, url) {
      console.log('url mw', url);
      next(url);
    }, function (next, url) {
      next(url);
    });

    get.use(/^https:\/\/www\.goo/, function (next, url) {
      console.log('reg mw', url);
      next(url);
    });

    get.use(function () {
      return true;
    }, function (next, url) {
      console.log('fn mw', url);
      next(url);
    });


    get = get.applyMiddlewares(function (url) {
      console.log('url', url)
      return url === 'http://www.google.fr';
    });

    get('https://www.google.fr');
  });

});
