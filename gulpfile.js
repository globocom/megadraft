/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

const gulp = require("gulp");
const gutil = require("gulp-util");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config.js");

// The development server (the recommended option for development)
gulp.task("default", ["dev-server"]);

const host = "localhost";
const port = 8080;

// http://stackoverflow.com/questions/30225866/gulp-webpack-dev-server-callback-before-bundle-is-finished
const hookStream = function(stream, data, cb) {
  // Reference default write method
  const oldWrite = stream.write;

  // Clear hook function
  const clearHook = function() {
    stream.write = oldWrite;
  };

  // New stream write with our shiny function
  stream.write = function() {
    // Old behaviour
    oldWrite.apply(stream, arguments);
    // Hook
    if (arguments[0] === data) {
      clearHook();
      cb();
    }
  };
};

gulp.task("sass", function() {
  return gulp
    .src("./src/styles/**/*.scss")
    .pipe(sass.sync({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("sass-copy", function() {
  return gulp.src("./src/styles/**/*.scss").pipe(gulp.dest("./lib/styles"));
});

gulp.task("site-sass", function() {
  return gulp
    .src("./website/styles/*.scss")
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
    },
    contentBase: __dirname + "/website"
  }).listen(port, host, function(err) {
    hookStream(process.stdout, "webpack: bundle is now VALID.\n", function() {
      gutil.log(
        "[dev-server]",
        gutil.colors.yellow("http://" + host + ":" + port)
      );
    });

    if (err) {
      throw new gutil.PluginError("webpack-dev-server", err);
    }
  });
});
