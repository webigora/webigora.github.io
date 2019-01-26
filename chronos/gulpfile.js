var gulp = require('gulp'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	svgSprite = require('gulp-svg-sprite');

var spritecConfig = {
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
};

gulp.task('browserSync', function() {
		browserSync({
			server: {
				baseDir: './'
		},
	})
});

gulp.task('svg-sprite', function () {
	watch('./images/*.svg', function () {
    	gulp.src('./images/*.svg')
        .pipe(svgSprite(spritecConfig))
        .pipe(gulp.dest('./'))
        .pipe(watch('images/*.svg', browserSync.reload));
    });
});

gulp.task('sass', function () {
	gulp.src('./sass/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('./'));
});

gulp.task('watch', ['browserSync', 'sass'], function () {;
	gulp.watch('./sass/style.scss', ['sass']);
	gulp.watch('*.css', browserSync.reload);
	gulp.watch('*.html', browserSync.reload);
	gulp.watch('js/*.js', browserSync.reload);
});

gulp.task('default', ['browserSync', 'watch', 'svg-sprite', 'sass']);