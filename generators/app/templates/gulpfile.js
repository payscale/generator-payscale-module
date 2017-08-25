var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function() {
    // babel src js files
    gulp.src('./src/*.js')
       .pipe(babel())
       .pipe(gulp.dest('./lib'));
});
