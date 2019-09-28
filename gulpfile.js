//Dependencias
const {src, dest, parallel, series, watch} = require('gulp');

const sass			= require('gulp-sass');
const minifyCss		= require('gulp-clean-css');
const concat		= require('gulp-concat');
const gcmq			= require('gulp-group-css-media-queries');
const rename 		= require('gulp-rename');
const minifyHtml    = require('gulp-htmlmin');

sass.compiler		= require('node-sass');

/*
 * Directories here
 */
var paths = {
	src: 'src/',
	scss: 'src/scss/',
	css: 'assets/css/',
	dist: 'dist/',
	distCss: 'dist/assets/css/',
};

// Preprocesador del css
function css() {
	return src('src/scss/*.scss')
	.pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
	.pipe(gcmq())
	.pipe(minifyCss({level: {1: {specialComments: 0}}}))
	.pipe(dest(paths.distCss));
}

// Preprocesador del html
function html() {
	return src('src/*.html')
	.pipe(minifyHtml({ collapseWhitespace: true }))
    .pipe(dest(paths.dist));
}

// Watch files
function watchFiles() {
    // Watch SCSS changes
    watch(paths.scss + '**/*.scss', parallel(css));
    // Watch HTML changes
    watch(paths.src + '*.html', parallel(html));
}

/*
 * Ejecute tasks
 *
 * gulp css
 * gulp html
 * gulp
 */

const watching	= parallel(watchFiles);

exports.css		= css;
exports.html	= html;
exports.default	= parallel(watching);
