const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');

gulp.task('sass', function() {
	return gulp.src('./sass/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('./css/'))
		.pipe(browserSync.stream());
});

gulp.task('svg-sprite', function() {
	return gulp.src('./images/*.svg')
        .pipe(svgSprite({
			mode: {
				symbol: {
					sprite: '../images/sprite/sprite.svg',
					render: {
						scss: {
							dest:'../sass/sprite.scss'
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
            baseDir: "./"
        }
	});
	
	gulp.watch('./sass/*.scss', gulp.series('sass'));
	gulp.watch('./js/*.js').on('change', browserSync.reload);
	gulp.watch('*.html').on('change', browserSync.reload);
	gulp.watch('./images/*.svg', gulp.series('svg-sprite'));
});

gulp.task('default', gulp.series('sass', 'svg-sprite', 'serve'));