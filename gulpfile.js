/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

var gulp = require("gulp");
var gutil = require("gulp-util");
var sass = require("gulp-sass");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");


// The development server (the recommended option for development)
gulp.task("default", ["dev-server"]);


gulp.task("sass", function () {
  return gulp.src("./src/sass/**/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulp.dest("./dist/css"));
});


gulp.task("dev-server", function(callback) {
  gulp.start("sass");
  gulp.watch("./src/sass/**/*.scss", ["sass"]);

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(webpackConfig), {
    stats: {
      colors: true
    }
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
  });
});
