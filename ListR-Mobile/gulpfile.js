/// <binding BeforeBuild='default' />
var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});



gulp.task('build-vendor', function () {
    return gulp.src([
        './www/lib/angular/angular.js',
        './www/lib/angular-route/angular-route.js',
        './www/lib/lodash/dist/lodash.js',
        './www/lib/angular-resource/angular-resource.js',
        './www/lib/ng-cordova-oauth/dist/ng-cordova-oauth.js',
        './www/lib/ngCordova/dist/ng-cordova.js'
    ])
      .pipe(concat('vendor.bundle.js'))
      .pipe(gulp.dest('./www/'));
});

gulp.task('build-app', function () {
    return gulp.src('./www/js/**/*.js')
      .pipe(concat('app.bundle.js'))
      .pipe(gulp.dest('./www/'));
});

gulp.task('build-all', [
    'build-app', 'build-vendor'
]);

gulp.task('watch', function () {
    gulp.watch('./www/js/**/*.js', ['build-app']);
});