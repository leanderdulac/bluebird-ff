# bluebird-ff
[![Build Status](https://travis-ci.org/pagarme/bluebird-ff.svg)](https://travis-ci.org/pagarme/bluebird-ff) [![Coverage Status](https://coveralls.io/repos/pagarme/bluebird-ff/badge.svg?branch=master)](https://coveralls.io/r/pagarme/bluebird-ff?branch=master)

# Usage

The library can be used as a bluebird replacement:

```js
var Promise = require('bluebird-ff');
```

You can use it as standalone functions:

```js
var bff = require('bluebird-ff/ff');
```

Also, you can "install" it on a target:

```js
var Promise = require("bluebird/js/main/promise")();

require('bluebird-ff/ff').install(Promise.prototype);

module.exports = Promise;
```

# Functions

## pif(test, consequent, alternate)

Calls `consequent` if `test` succeeds, otherwise, calls `alternate`.

## when(test, consequent)

Calls `consequent` only if `test` succeeds.


## unless(test, consequent)

Calls `consequent` only if `test` fails.

## and(fn)

Useful for chaining several results, example:

```js
return Promise.resolve(customerIds)
.then(loadCustomers)
.and(loadTransactionsFromCustomers)
.then(function(customers, transactions) {
	...
});
```

## propsWithErrors(promises)

Like Promise.props, but returning AggregateError with each error.

# License

Check [here](LICENSE).

