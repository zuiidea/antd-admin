var gulp = require('gulp')
var clean = require('gulp-clean')

gulp.task('copy', function() {
  return gulp.src(["dist/**/*.*"])
    .pipe(gulp.dest(''))
});

gulp.task('default', function() {
  gulp.start('copy')
});
