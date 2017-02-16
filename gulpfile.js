var gulp = require('gulp'),               // 載入 gulp
    gulpUglify = require('gulp-uglify'),  // 載入 gulp-uglify
    gulpSass = require('gulp-sass'),      // 載入 gulp-sass
    gulpPlumber = require('gulp-plumber'),// 載入 gulp-plumber
    gulpImagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create(),
    inject = require('gulp-inject');

gulp.task('index', function () {
  var target = gulp.src('./index.html');
  var sources = gulp.src(['./src/*.js', './src/css/*.css'], {read: false});
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./'));
});

gulp.task('server', ['watch'], function () {
  browserSync.init({
    server: {
       baseDir: "./"
     }
  });
});

gulp.task('watch', function () {
  gulp.watch('src/*.js', ['scripts']);
  gulp.watch('src/css/*.scss', ['sass']);
  gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('scripts', function () {
  gulp.src('src/*.js')            // 指定要處理的原始 JavaScript 檔案目錄
    .pipe(gulpPlumber())
    .pipe(gulpUglify())                         // 將 JavaScript 做最小化
    .pipe(gulp.dest('dist'))      // 指定最小化後的 JavaScript 檔案目錄
    .pipe(browserSync.stream());
});

gulp.task('sass', function () {
  gulp.src('src/css/*.scss')                      // 指定要處理的 Scss 檔案目錄
    .pipe(gulpPlumber())
    .pipe(gulpSass({                            // 編譯 Scss
        outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('dist/css'))                    // 指定編譯後的 css 檔案目錄
    .pipe(browserSync.stream());
});

gulp.task('image', function () {
  gulp.src('src/images/**')
    .pipe(gulpPlumber())
    .pipe(gulpImagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('default', ['index', 'server']);
