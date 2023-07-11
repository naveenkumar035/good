const { PythonShell } = require('python-shell');

module.exports = function(source) {
  const callback = this.async();
  PythonShell.runString(source, null, function(err, results) {
    if (err) {
      callback(err);
    } else {
      callback(null, results[0]);
    }
  });
};
