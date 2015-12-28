var chai = require('chai');
var Promise = require('../lib');
var expect = chai.expect;

chai.use(require('chai-as-promised'));

describe('when', function() {
	it('should call the consequence when the test returns true', function() {
		var promise = Promise
		.resolve('123')
		.pif(test, function(value) {
			expect(value).to.eql('123');

			return 'success';
		});

		return expect(promise).to.eventually.eql('success');
	});

	it('should not call the alternative when the test returns false', function() {
		var promise = Promise
		.resolve('456')
		.when(test, function(value) {
			return 'fail';
		});

		return expect(promise).to.eventually.eql('456');
	});

	function test(value) {
		return value == '123';
	}
});


