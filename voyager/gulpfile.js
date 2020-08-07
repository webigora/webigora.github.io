const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const svgSprite = require('gulp-svg-sprite');

gulp.task('sass', function() {
	return gulp.src('./src/sass/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(browserSync.stream());
});

gulp.task('js', function() {
	return gulp.src([
			'./src/js/jquery-3.5.1.min.js',
			'./src/js/*.js'
		])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js/'))
		.pipe(browserSync.stream());
});

gulp.task('svg-sprite', function() {
	return gulp.src('./src/images/icons/*.svg')
        .pipe(svgSprite({
			mode: {
				symbol: {
					sprite: '../dist/images/sprite/sprite.svg',
					render: {
						scss: {
							dest:'../src/sass/sprite.scss'
						}
					},
					prefix: '.svg_',
					dimensions: '%s'
				}
			}
		}))
        .pipe(gulp.dest('./'))
});

gulp.task('serve', function() {
	browserSync.init({
        server: {
            baseDir: './dist/'
        }
	});
	
	gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
	gulp.watch('./src/js/*.js', gulp.series('js'));
	gulp.watch('./dist/*.html').on('change', browserSync.reload);
	gulp.watch('./src/images/icons/*.svg', gulp.series('svg-sprite'));
});

gulp.task('default', gulp.series('sass', 'js', 'svg-sprite', 'serve'));