"use strict"

var gutil = require('gulp-util');
var through = require('through2');
var parseNgModule = require('./parse.js').parseNgModule;
var parseComponent = require('./parse.js').parseComponent;
var parseInjectable = require('./parse.js').parseInjectable;
var parseDirective = require('./parse.js').parseDirective;

var PLUGIN_NAME = 'gulp-ng-decorator';


module.exports = exports = function decorate(options){
	return through.obj(function(file, enc, cb){
		if(file.isNull()){
			return cb(null, file);
		}

		try {
			var content = file.contents.toString();
			var new_content = parseNgModule(content);
				new_content = parseComponent(new_content);
				new_content = parseInjectable(new_content);
				new_content = parseDirective(new_content);

			var _this = this;

			file.contents = new Buffer(new_content);
			_this.push(file);
			process.nextTick(cb);
			// console.log(new_content);
		} catch(err) {
			return cb(new gutil.PluginError(PLUGIN_NAME, 'Error parsing content' + err));
		}
	})	
}