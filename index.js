function createOKNOKCallback({ ok, nok, log = console.log }) {
  return function standardBailCallback(error) {
    if (error) {
      if (log) {
        if (error.stack) {
          log(error, error.stack);
        } else {
          log(error);
        }
      }
      if (nok) {
        nok(error);
      }
    } else if (ok) {
      var okArgs = Array.prototype.slice.call(arguments, 1);
      if (nok) {
        okArgs.push(nok);
      }
      ok.apply(ok, okArgs);
    }
  };
}

module.exports = createOKNOKCallback;
