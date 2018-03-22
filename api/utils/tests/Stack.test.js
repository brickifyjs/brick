'use strict';

var o = require('ospec');
var Stack = require('../Stack.js');

o.spec('Stack', function () {
  o.spec('Can have different type of stacks', function () {
    o('Can be an array of function', function () {
      var stack = new Stack([
        function (next, int) {
          return next(int + 1);
        },
        function (next, int) {
          return next(int + 1);
        }
      ]);

      o(stack.start(1)).equals(3);
    });

    o('Can contain substack', function () {
      var stack = new Stack([
        function (next, int) {
          return next(int + 1);
        },
        new Stack([
          function (next, int) {
            return next(int + 1);
          },
          function (next, int) {
            return next(int + 1);
          }
        ]),
        function (next, int) {
          return next(int + 1);
        }
      ]);

      o(stack.start(1)).equals(5);
    });
  });

  o.spec('Can be prevented', function () {
    o('Continue by default', function () {
      var stack = new Stack([
        function (next, int) {
          return next(int + 1);
        },
        function (next, int) {
          return next(int + 1);
        },
        function (next, int) {
          return next(int + 1);
        }
      ]);

      o(stack.start(1)).equals(4);
    });

    o('Break stack', function () {
      var stack = new Stack([
        function (next, int) {
          return next.break(int + 1);
        },
        new Stack([
          function (next, int) {
            return next(int + 1);
          }]
        ),
        function (next, int) {
          return next(int + 1);
        }
      ]);

      o(stack.start(1)).equals(3);
    });

    o('Stop all stacks', function () {
      var stack = new Stack([
        function (next, int) {
          return next.stop(int + 1);
        },
        function (next, int) {
          return next(int + 1);
        },
        function (next, int) {
          return next(int + 1);
        }
      ]);

      o(stack.start(1)).equals(2);
    });
  });

  o('Can be deviate', function () {
    var stack = new Stack([
      function (next0, int0) {
        var substack = new Stack([
          function (next, int) {
            return next(int + 1);
          },
          function (next, int) {
            return next(int + 1);
          }
        ]).start(1);

        return next0(substack + int0);
      },
      function (next, int) {
        return next(int + 1);
      }
    ]);

    o(stack.start(1)).equals(5);
  });

  o.spec('Can be run sync/async', function () {
    o('Can be run sync', function () {
      var stack = new Stack([
        function (next, int) {
          return next(int + 1);
        },
        function (next, int) {
          return next(int + 1);
        }
      ]);

      o(stack.start(1)).equals(3);
    });

    o('Can be run async', function (done) {
      var stack = new Stack([
        function (next, int) {
          o(next(int + 1)).equals(3);
          done();
        },
        function (next, int) {
          return next(int + 1);
        }
      ]);

      stack.start(1);
    });
  });

  o('Can override origin method', function () {
    var ctx = {
      add: function (int) {
        return int + 1;
      }
    };

    new Stack([
      function (next, int) {
        return next(int + 1);
      }
    ], 'add', ctx);

    o(ctx.add(1)).equals(2);
  });
});
