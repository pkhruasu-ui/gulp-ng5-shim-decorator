var gulp = require('gulp');
var ngDecorator = require('./index.js');

const FILES_OPTION = {
	SRC: './test-file.js',
	DEST: './tmp'
}

gulp.src(FILES_OPTION.SRC)
	.pipe(ngDecorator())
	.pipe(gulp.dest(FILES_OPTION.DEST));