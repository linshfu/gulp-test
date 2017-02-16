# gulp-test

## gulp browserSync reload

    browserSync = require('browser-sync').create();

    gulp.task('server', function () {
      browserSync.init({
        server: {
           baseDir: "./"
         }
      });
    });

    gulp.task('sass', function () {
      gulp.src(....)
        .pipe(browserSync.stream());
    });
