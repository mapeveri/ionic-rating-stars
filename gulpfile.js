var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
  var src = [
      'dist/js/ionic-rating-stars.js',
  ];

  return gulp.src(src)
    .pipe(concat('ionic-rating-stars.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});
