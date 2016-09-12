var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache');

gulp.task('styles', function() {
  return sass('src/scss/styles.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 3 version'))
    .pipe(gulp.dest('css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'STYLES PREPROCESSED SUCCESSFULLY' }));
});

gulp.task('scripts', function() {
  return gulp.src([
    'src/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(notify({ message: 'SCRIPTS CONCAT + UGLIFY SUCCESSFULLY' }));
});

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/scss/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch(['src/js/*.js'], ['scripts']);


});

gulp.task('default', ['styles'], function() {
    gulp.start('scripts','watch');
});