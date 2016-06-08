var chai = require('chai');
var Promise = require('../lib');
var expect = chai.expect;

chai.use(require('chai-as-promised'));

describe('propsWithErrors', function() {
  it('should behave like props when no errors', function() {
    var promise = Promise.propsWithErrors({
      first:  Promise.resolve('1st'),
      second: Promise.resolve('2nd')
    });

    return expect(promise).to.eventually.eql({first: '1st', second: '2nd'});
  });

  it('should throw aggregareError', function() {
    var promise = Promise.propsWithErrors({
      pass:    Promise.resolve('pass'),
      explode: Promise.reject('exploded'),
      throws:  Promise.reject('threw')
    });

    return expect(promise).to.be.rejectedWith(Promise.AggregateError);
  });
});

