function createStandardBail(log, outerCallback, success) {
  return function standardBailCallback(error) {
    if (error) {
      if (log) {
        log(error, error.stack);
      }
      if (outerCallback) {
        outerCallback(error);
      }
    }
    else if (success) {
      success.apply(success, Array.prototype.slice.call(arguments, 1));
    }
  };
}

module.exports = createStandardBail;
