#!/usr/bin/env node
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var imageminPngquant = require('imagemin-pngquant')
var del = require('del');
var browserSync = require('browser-sync').create();
var argv = require('yargs').argv;

var $ = gulpLoadPlugins();

var BLOCKS = {
	"common": "blocks"
};

var SOURCES = [
  `${BLOCKS.common}/sound/sound.js`,
  `${BLOCKS.common}/dice/dice.js`,
  `${BLOCKS.common}/confetti/confetti.js`,
  `${BLOCKS.common}/screen/screen.js`,
  `${BLOCKS.common}/game/game.js`
];

var WATCH = {
	sass: [
		`${BLOCKS.common}/**/*.scss`
	],
	js: [
		`${BLOCKS.common}/**/*.js`
	],
	html: [
		'*.html'
	],
	img: 'img_pre/*'
};

var AUTOPREFIXER_BROWSERS = [
	'ie >= 10',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4.4',
	'bb >= 10'
];

// ***** Production build tasks ****** //

// Concatenate And Minify JavaScript
gulp.task('js', function() {
	return gulp.src(SOURCES)
	.pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
	.pipe($.sourcemaps.init())
	.pipe($.babel({
		presets: ['env'],
		plugins: [["babel-plugin-transform-builtin-extend", {"globals": ["Error", "Array"]}]]
	}))
	// Concatenate Scripts
	.pipe($.concat('bundle.js'))
	// Write Source Maps
	.pipe($.sourcemaps.write('maps'))
	.pipe(gulp.dest('bundle'))
	// Minify Scripts
	.pipe($.uglify({
		sourceRoot: '.',
		sourceMapIncludeSources: true
	}))
	.pipe($.rename('bundle.min.js'))
	.pipe(gulp.dest('bundle'))
	.pipe($.size({title: 'js'}))
	.pipe($.notify('Task js completed!'))
});

gulp.task('js-watch', ['js'], function (done) {
	browserSync.reload();
	done();
});

// Concatenate And Minify Stylesheets
gulp.task('css', function() {
	return gulp.src('bundle/bundle.css')
		.pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
		.pipe($.concatCss("bundle.css"))
		.pipe($.autoprefixer({
			browsers: AUTOPREFIXER_BROWSERS,
			cascade: false
		 }))
		.pipe($.csscomb())
		.pipe(gulp.dest('bundle'))
		.pipe($.cleanCss({compatibility: 'ie8'}))
		.pipe($.rename('bundle.min.css'))
		.pipe(gulp.dest('bundle'))
		.pipe($.notify('Task css completed!'));
});

gulp.task('css-watch', ['css'], function (done) {
	browserSync.reload();
	done();
});


// Optimize Images
gulp.task('img', function () {
	gulp.src('img_pre/*')
		.pipe($.changed('img'))
		.pipe($.cache($.imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [imageminPngquant()]
		})))
		.pipe(gulp.dest('img'))
		.pipe($.notify('Task img completed!'))
		.pipe($.size({title: 'img'}));
});

gulp.task('img-watch', ['img'], function(done) {
	browserSync.reload();
	done();
});

// Generate svg sprite
gulp.task('svg', function () {

	var config = {
		shape: {
			align: 'img/svg.yaml',
		},
		mode: {
			css: {
				render: {
					css: true
				}
			}
		}
	};

	return gulp.src('img/*.svg')
		.pipe($.svgSprite(config))
		.pipe(gulp.dest('img/svg-out'))
		.pipe($.notify('Task svg completed!'));
});

// ***** Development tasks ****** //

// Compile sass files
gulp.task('sass', function () {
	return gulp.src(`${BLOCKS.common}/style.scss`)
		.pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
		.pipe($.sourcemaps.init())
		.pipe($.sass({
			 outputStyle: 'expanded',
		 }).on('error', $.sass.logError))
		.pipe($.rename('bundle.css'))
		// Write Source Maps
		.pipe($.sourcemaps.write('maps'))
		.pipe(gulp.dest('bundle'))
		.pipe(browserSync.stream())
});

// Clean img direcotry
gulp.task('imgclean', function() {
	return gulp.src('img', {read: false})
		.pipe($.clean())
		.pipe(notify('Task imgclean completed!'));
});

// Defines the list of resources to watch for changes.
var watch = function() {
	gulp.watch(WATCH.sass, ['sass']);
	gulp.watch(WATCH.js, ['js-watch']);
	gulp.watch(WATCH.img, ['img-watch']);
	gulp.watch(WATCH.html).on('change', browserSync.reload);
};

// Converting Css to Scss
gulp.task('converting', function() {
  return gulp.src(argv.c_s_path + argv.c_s_file)
	.pipe($.cssScss())
	.pipe($.rename(function (path) {
		path.basename = "_" + path.basename;
	}))
	.pipe(gulp.dest(argv.c_s_path));
});

// Delete file css after converting
gulp.task('css-scss', ['converting'], function(cb) {
	del(argv.c_s_path + argv.c_s_file)
	cb();
});

// Serves app
gulp.task('serve', [argv.task || 'sass'], function() {

	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	watch();

});

gulp.task('default', ['serve']);


// Create bem block from module
gulp.task('mod-copy', function() {
	/**
	 * Argv
	 * mod - path to the module
	 * block - folder name for copying
	 * ext - file extension
	 * out - path to the working folder
	 */
	var modules = 'node_modules/',
		mod = argv.mod ? modules + argv.mod : modules + 'material-design-lite/src/',
		blocks = (typeof argv.block === 'string') ? [argv.block] :
					 (argv.block === undefined) ?	[''] :
					 argv.block,
		ext = argv.ext ? '/*.' + argv.ext  : '/*.@(js|scss)',
		blocks_tmp = [],
		i;

	for (i = 0; i < blocks.length; i++) {
		blocks_tmp.push(mod + blocks[i] + ext);

		gulp.src(blocks_tmp[i])
			.pipe(gulp.dest((argv.out || 'blocks/') + blocks[i]));
	}
	console.log(argv);
});

// archive the project
gulp.task('zip', function () {
	return gulp.src([
		'**',
		'!node_modules', '!node_modules/**',
		'!app', '!app/**',
		'!img_pre', '!img_pre/**'
	], {base: '.'})
		.pipe(zip('bak.zip'))
		.pipe(gulp.dest('.'))
		.pipe(notify('Zrobleno! Task zip!'));
});
