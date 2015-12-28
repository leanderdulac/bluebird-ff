var fns = require('./fns');

exports.install = function(target) {
	Object.keys(fns).forEach(function(name) {
		target[name] = function() {
			return this.then(fns[name].apply(null, arguments));
		};
	});
};

for (var key in fns) {
	exports[key] = fns[key];
}

