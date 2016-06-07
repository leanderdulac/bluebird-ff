var Promise = require("bluebird/js/release/promise")();

module.exports = Promise;

require('./ff').install(Promise, true);
require('./ff').install(Promise.prototype, false);

