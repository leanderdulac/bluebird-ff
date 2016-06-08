var util    = require('util');
var Promise = require('./index');

exports.pif             = pif;
exports.when            = when;
exports.unless          = unless;
exports.and             = and;
exports.propsWithErrors = propsWithErrors;

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
    if (!arg || !util.isArray(arg) || arg.__ff_and_sig !== true) {
      arg = [arg];

      Object.defineProperty(arg, '__ff_and_sig', {
        configurable: false,
        writable: false,
        enumerable: false,
        value: true
      });
    }

    return Promise.resolve(fn.apply(this, arg))
    .then(function(result) {
      arg.push(result);

      return arg;
    });
  };
}

function propsWithErrors() {
  return function(_promises){
    var errors       = new Promise.AggregateError();
    var safePromises = {};

    return Promise.resolve(_promises).then(function(promises){
      for(var key in promises){
        safePromises[key] = Promise.resolve(promises[key]).catch(pushError);
      }

      return Promise.props(safePromises).then(function(result){
        if(errors.length > 0){
          throw errors;
        } else {
          return result;
        }
      })
    })

    function pushError(err){
      errors.push(err);
      return null;
    }
  }
}
