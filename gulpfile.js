'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

gulp.task('copy', function () {
  return gulp.src([
      'src/**/*',
      '!src/**/*.scss'
    ])
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('css', function () {
  var plugins = [
    autoprefixer({
      browsers: ['last 1 version']
    })
  ];
  return gulp.src(['src/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});


gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });

  gulp.watch(['src/**/*.scss'], ['css']);

  gulp.watch([
    'src/**/*',
    '!src/**/*.scss'
  ], ['copy']);
});

gulp.task('default', ['copy', 'css', 'watch']);