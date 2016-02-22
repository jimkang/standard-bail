var test = require('tape');
var sb = require('../index');
var callNextTick = require('call-next-tick');

test('Basic success', function basicSuccess(t) {
  successfulCall(sb(checkLog, checkOuterCallback, checkSuccess));

  function successfulCall(cb) {
    callNextTick(cb, null, 1, 2, 3);
  }

  function checkOuterCallback() {
    t.fail('Done is not called when call is successful.');
  }

  function checkLog() {
    t.fail('Log is not called when call is successful.');
  }

  function checkSuccess(result1, result2, result3) {
    t.equal(result1, 1, 'result1 passed to checkSuccess.');
    t.equal(result2, 2, 'result2 passed to checkSuccess.');
    t.equal(result3, 3, 'result3 passed to checkSuccess.');
    t.end();
  }
});

test('Basic failure', function basicFailure(t) {
  t.plan(3);
  failingCall(sb(checkLog, checkOuterCallback, checkSuccess));

  function failingCall(cb) {
    callNextTick(cb, new Error('Call failed.'));
  }

  function checkOuterCallback(error) {
    t.equal(error.message, 'Call failed.', 'Done is called with an error when call fails.');
  }

  function checkLog(error, stack) {
    t.equal(error.message, 'Call failed.', 'Log is called with an error when call fails.');
    t.ok(stack, 'Log is called with a stack when call fails.');
  }

  function checkSuccess(result1, result2, result3) {
    t.fail('Success is not called when call is successful.');
  }
});

