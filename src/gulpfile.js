var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    $ = require('gulp-load-plugins')();

gulp.task('styles', function() {
  return gulp.src('scss/styles.scss')
    .pipe($.sass({
      outputStyle: 'expanded'
    })
    .on('error', $.sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }))
    .pipe(gulp.dest('../css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('../css'))
    .pipe(notify({ message: 'STYLES PREPROCESSED SUCCESSFULLY' }));
});

gulp.task('scripts', function() {
  return gulp.src([
    'js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('../js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('../js'))
    .pipe(notify({ message: 'SCRIPTS CONCAT + UGLIFY SUCCESSFULLY' }));
});

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('scss/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch(['js/*.js'], ['scripts']);


});

gulp.task('default', ['styles'], function() {
    gulp.start('scripts','watch');
});