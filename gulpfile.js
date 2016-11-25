/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

var gulp = require("gulp");
var gutil = require("gulp-util");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");


// The development server (the recommended option for development)
gulp.task("default", ["dev-server"]);

var host = "localhost";
var port = 8080;

// http://stackoverflow.com/questions/30225866/gulp-webpack-dev-server-callback-before-bundle-is-finished
var hook_stream = function( stream, data, cb ) {
  // Reference default write method
  var old_write = stream.write;

  // Clear hook function
  var clear_hook = function() {
    stream.write = old_write;
  };

  // New stream write with our shiny function
  stream.write = function() {
    // Old behaviour
    old_write.apply( stream, arguments );
    // Hook
    if ( arguments[ 0 ] === data ) {
      clear_hook();
      cb();
    }
  };
};

gulp.task("sass", function () {
  return gulp.src("./src/styles/**/*.scss")
    .pipe(sass.sync({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("sass-copy", function () {
  return gulp.src("./src/styles/**/*.scss")
    .pipe(gulp.dest("./lib/styles"));
});

gulp.task("site-sass", function () {
  return gulp.src("./website/styles/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("./website/styles/"));
});

gulp.task("site-watch", function() {
  gulp.watch("./src/styles/**/*.scss", ["site-sass"]);
  gulp.watch("./website/styles/*.scss", ["site-sass"]);
});

gulp.task("dev-server", function(callback) {
  gulp.start("site-sass");
  gulp.start("site-watch");
  // Start a webpack-dev-server
  new WebpackDevServer(webpack(webpackConfig), {
    stats: {
      colors: true
    }
  }).listen(port, host, function(err) {
     hook_stream( process.stdout, 'webpack: bundle is now VALID.\n', function() {
        gutil.log( '[dev-server]', gutil.colors.yellow( 'http://' + host + ':' + port + '/website/#/dev' ) );
      } );

    if(err) throw new gutil.PluginError("webpack-dev-server", err);
  });
});
