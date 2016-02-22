standard-bail
==================

An abstraction of the most basic kind of error handling callback.

It creates a callback that checks for an error and if there is one, it (optionally) logs it and (optionally) passes it back to the `done` function. If there isn't, it calls the success handler function you've defined.

It's just a way to DRY up callbacks a bit.

Installation
------------

    npm install standard-bail

Usage
-----

Instead of:

    function doAThing(outerDone) {
      someAPI(aCallback);

      function aCallback(error, result, otherThing) {
        if (error) {
          log(error, error.stack);
          outerDone(error);
        }
        else {
          // Use result and otherThing in case in which someAPI call succeeded.
        }
      }

You can do:

    var sb = require('standard-bail');

    function doAThing(outerDone) {
      someAPI(log, successHandler, outerDone));

      function successHandler(result, otherThing) {
          // Use result and otherThing in case in which someAPI call succeeded.
      }
    }

Here, `successHandlers` doesn't worry about errors. `sb` will have already handled it in a way a jillion other errors are handled: by logging it and/or passing it to `done`.

`sb` has three parameters, log, outerDone, and success. 

All are optional can be undefined or null. You really should have either a outerDone or a log, though, in order to avoid silent failures.

`success` will be passed all of the non-error parameters passed to the callback. `outerDone` is the done callback passed to the outer function. `log` will be passed the error and the error stack to, presumably, log.

If you want `log` to default to `console.log` (or any other log), you can use `lodash.curry` like so: `var sb = _.curry(require('standard-bail'))(console.log)`. (Keep in mind that `console.log` can causes problems in some cases, as it is synchronous. However, it's fine in a quite a few cases as well.)

Tests
-----

Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2016 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
