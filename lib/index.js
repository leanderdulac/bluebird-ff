var Promise = require("bluebird/js/release/promise")();

module.exports = Promise;

require('./ff').install(Promise.prototype);

