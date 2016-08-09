
var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('build-app', function () {
    return gulp.src('./wwwroot/app/*.js')
      .pipe(concat('app.bundle.js'))
      .pipe(gulp.dest('./wwwroot/'));
});

gulp.task('build-vendor', function () {
    return gulp.src([
        './wwwroot/vendor/angular/angular.js',
        './wwwroot/vendor/angular-route/angular-route.js',
        './wwwroot/vendor/hammerjs/hammer.js',
        './wwwroot/vendor/angular-hammer/angular-hammer.js',
        './wwwroot/vendor/lodash/dist/lodash.js',
        './wwwroot/vendor/angular-resource/angular-resource.js'

    ])
      .pipe(concat('vendor.bundle.js'))
      .pipe(gulp.dest('./wwwroot/'));
});

gulp.task('build-all', [
    'build-app', 'build-vendor'
]);

gulp.task('watch', function () {
    gulp.watch('./wwwroot/app/**/*.js', ['build-all']);
});

gulp.task('default', ['watch']);