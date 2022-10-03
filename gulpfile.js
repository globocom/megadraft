/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

const gulp = require("gulp");
const gutil = require("gulp-util");
const gulpSass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config.js");

const host = "localhost";
const port = 8080;

gulpSass.compiler = require("sass");

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

function sass() {
  return gulp
    .src("./src/styles/megadraft.scss")
    .pipe(
      gulpSass.sync({ outputStyle: "expanded" }).on("error", gulpSass.logError)
    )
    .pipe(autoprefixer())
    .pipe(gulp.dest("./dist/css"));
}

function sassCopy() {
  return gulp.src("./src/styles/**/*.scss").pipe(gulp.dest("./lib/styles"));
}

function siteSass(done) {
  return gulp
    .src("./website/styles/*.scss")
    .pipe(gulpSass.sync().on("error", gulpSass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("./website/styles/"));
}

function siteWatch() {
  gulp.watch("./src/styles/**/*.scss", siteSass);
  gulp.watch("./website/styles/*.scss", siteSass);
}

const devServer = gulp.parallel([siteSass, siteWatch], function devServer() {
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

exports.sass = sass;
exports["sass-copy"] = sassCopy;
exports["site-sass"] = siteSass;
exports["site-watch"] = siteWatch;
exports["dev-server"] = devServer;

// The development server (the recommended option for development)
exports.default = devServer;
