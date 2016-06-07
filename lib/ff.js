var fns = require('./fns');

exports.install = function(target, isStatic) {
	Object.keys(fns).forEach(function(name) {
    
    if (isStatic) {
		  target[name] = function() {
        var args = [].slice.call(arguments, 0)
        
			  return fns[name].apply(null, args.slice(1))(args[0]);
		  };
    } else {
		  target[name] = function() {
			  return this.then(fns[name].apply(null, arguments));
		  };
    }
	});
};

for (var key in fns) {
	exports[key] = fns[key];
}

