var gulp = require('gulp'),
  path = require('path'),
  data = require('gulp-data'),
  pug = require('gulp-pug'),
  prefix = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename');
  uglify = require('gulp-uglify-es').default;

/*
 * Directories here
 */
var paths = {
  build: './build/',
  sass: './src/sass/',
  css: './build/css/',
  js: './build/js/',
  data: './src/views/_data/'
};

/**
 * Compile .pug files and pass in data from json file
 * matching file name. index.pug - index.pug.json
 */
gulp.task('pug', function () {
  return gulp.src('./src/views/*.pug')
    .pipe(data(function (file) {
      return require(paths.data + path.basename(file.path) + '.json');
    }))
    .pipe(pug())
    .on('error', function (err) {
      process.stderr.write(err.message + '\n');
      this.emit('end');
    })
    .pipe(gulp.dest(paths.build));
});

/**
 * Recompile .pug files and live reload the browser
 */
gulp.task('rebuild', ['pug'], function () {
  browserSync.reload();
});

/**
 * Wait for pug and sass tasks, then launch the browser-sync Server
 */
gulp.task('browser-sync', ['sass', 'pug', 'js'], function () {
  browserSync({
    server: {
      baseDir: paths.build
    },
    notify: false
  });
});

/**
 * Compile .scss files into build css directory With autoprefixer no
 * need for vendor prefixes then live reload the browser.
 */
gulp.task('sass', function () {
  return gulp.src(paths.sass + '**/*.scss')
    .pipe(sass({
      includePaths: [paths.sass],
      outputStyle: 'compressed'
    }))
    .on('error', sass.logError)
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
      cascade: true
    }))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});

/**
 * Minify js files
 */
gulp.task('js', function(){
  return gulp.src('./src/js/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename("app.min.js"))
    .pipe(gulp.dest(paths.js))
    .pipe(browserSync.reload({
      stream: true
    }));
});

/**
 * Watch scss files for changes & recompile
 * Watch js files for changes
 * Watch .pug files run pug-rebuild then reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch(paths.sass + '**/*.scss', ['sass']);
  gulp.watch('./src/js/*.js', ['js']);
  gulp.watch('./src/views/**/*.pug', ['rebuild']);
});

// Build task compile sass and pug.
gulp.task('build', ['sass', 'pug', 'js']);

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', ['browser-sync', 'watch']);
