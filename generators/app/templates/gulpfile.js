var gulp = require('gulp');
var del = require('del');
var babel = require('gulp-babel');

gulp.task('default', function() {
    // babel src js files
    gulp.src('./src/*.js')
       .pipe(babel())
       .pipe(gulp.dest('./lib'));

    // babel src component js files
    gulp.src('./src/components/*.js')
       .pipe(babel())
       .pipe(gulp.dest('./lib/components'));

    // copy sass files to lib
    gulp.src('./src/styles/*.scss')
       .pipe(gulp.dest('./lib/styles'));

    // delete js files in css directory
    del(['./dist/css/*.js']);
});
