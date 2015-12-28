var chai = require('chai');
var Promise = require('../lib');
var expect = chai.expect;

chai.use(require('chai-as-promised'));

describe('pif', function() {
	it('should call the consequence when the test returns true', function() {
		var promise = Promise
		.resolve('123')
		.pif(test, function(value) {
			expect(value).to.eql('123');

			return 'success';
		}, function() {
			return 'fail';
		});

		return expect(promise).to.eventually.eql('success');
	});

	it('should call the alternative when the test returns false', function() {
		var promise = Promise
		.resolve('456')
		.pif(test, function() {
			return 'success';
		}, function(value) {
			expect(value).to.eql('456');
			
			return 'fail';
		});

		return expect(promise).to.eventually.eql('fail');
	});

	function test(value) {
		return value == '123';
	}
});

