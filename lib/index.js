var Promise = require("bluebird/js/main/promise")();

module.exports = Promise;

require('./ff').install(Promise.prototype);

