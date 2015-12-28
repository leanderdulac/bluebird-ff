var chai = require('chai');
var Promise = require('../lib');
var expect = chai.expect;

chai.use(require('chai-as-promised'));

describe('and', function() {
	it('should append the result with the previous result', function() {
		var promise = Promise.resolve('123')
		.and(function(value) {
			expect(value).to.eql('123');

			return '456';
		});

		return expect(promise).to.eventually.eql(['123', '456']);
	});
});

