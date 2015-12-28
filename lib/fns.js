var util = require('util');
var Promise = require('./index');

exports.pif = pif;
exports.when = when;
exports.unless = unless;
exports.and = and;

function identity(a) {
	return a;
}

function pif(test, consequent, alternate) {
	return function(value) {
		return test(value) ? consequent(value) : alternate(value);
	};
}

function when(test, f) {
	return pif(test, f, identity);
}

function unless(test, f) {
	return pif(test, identity, f);
}

function and(fn) {
	return function(arg) {
		if (!util.isArray(arg)) {
			arg = [arg];
		}

		return Promise.all(arg.concat([fn.apply(this, arg)]));
	};
}

