(() => {
	'use strict';

const gulp = require('gulp'),
	path = require('path'),
	fs = require('fs'),
	concat = require("gulp-concat"),
	sass = require('gulp-sass'),
	minify = require('gulp-minify'),
	gulpCopy = require('gulp-copy'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	del = require('del'),
  browserSync = require('browser-sync').create();



function clean() {
	return del ([

    // './aeb-site/wp-content/themes/AEGGB/js/**/*.js',
		// '!./aeb-site/wp-content/themes/AEGGB/js/customizer.js',
		// '!./aeb-site/wp-content/themes/AEGGB/js/navigation.js',
		// '!./aeb-site/wp-content/themes/AEGGB/js/skip-link-focus-fix.js',
		// './aeb-site/wp-content/themes/AEGGB/css/**/*.css',
		// './aeb-site/wp-content/themes/AEGGB/images/**/*',
		// './aeb-site/wp-content/themes/AEGGB/images/**/*.txt',
		// '!./aeb-site/wp-content/themes/AEGGB/fonts/**/*',
		// '!./aeb-site/wp-content/themes/AEGGB/fonts/**/*.txt'

	]);
}


function concatJS() {
	return gulp.src('./src/js/*.js')
		.pipe(concat('scripts.js'))
		.pipe(minify())
		.pipe(gulp.dest('dist/js/'));
}

//
// function concatVendorJS() {
// 	return gulp.src('./src/js/vendors/*.js')
// 		.pipe(concat('vendor-scripts.js'))
// 		.pipe(minify())
// 		.pipe(gulp.dest('./aeb-site/wp-content/themes/AEGGB/js/vendors/'));
// }
//

function concatSCSS() {
	return gulp.src('src/scss/*.scss')
  	.pipe(sass().on('error',sass.logError))
		.pipe(concat('styles.min.css'))
		.pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream());
}




function compressCSS() {
	return gulp.src('src/styles/*.css')
  pipe(concat('styles.css'))
		.pipe(rename("styles.css"))
		.pipe(cleanCSS())
		.pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream());
}
//
// function concatCSS() {
// 	return gulp.src('dist/css/*.css')
//
// 		.pipe(concat('styles3.min.css'))
// 		.pipe(gulp.dest('dist/css/'))
//     .pipe(browserSync.stream());
// }

exports.css = gulp.series(concatSCSS, compressCSS);


function copyRootFiles(done) {
	return gulp.src('src/*.*')
        .pipe(gulp.dest('dist/'))
				.pipe(browserSync.stream());
    done();
}

function copyImg(done) {
	return gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images/'));
    done();
}

exports.copy = gulp.series(copyRootFiles, copyImg);

function watch(done) {
  browserSync.init({
      server: {
         baseDir: "src",
         index: "dist/index1.html"
      }
  });
	gulp.watch("src/js/*.js", gulp.series(concatJS, exports.copy));
	gulp.watch("src/scss/*.scss", exports.css);
	gulp.watch('src/*.*', copyRootFiles);

	gulp.watch('src/images/**/*.*', copyImg);

	done();
}



//gulp.task('default', ['concat-scss','concat-vendor-js','concat-js','copy','compressCSS','watch']);

exports.default = gulp.series(clean, copyRootFiles,concatSCSS, compressCSS, concatJS, exports.css, exports.copy, watch);
gulp.task('default', function() {
    gulp.start('watch');
});


//exports.jenkins = gulp.series(clean, concatJS, exports.css, exports.copy);

})();
