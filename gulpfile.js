"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var del = require("del");
var minify = require("gulp-minify");
var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    // imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("build/img"))
  .pipe(server.stream());
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(gulp.dest("build"));
});

gulp.task("script", function () {
  return gulp.src("source/js/script.js")
  .pipe(minify())
  .pipe(rename("script.min.js"))
  .pipe(gulp.dest("build/js"))
  .pipe(server.stream());
});

gulp.task("copy", function () {
  return gulp.src([
  "source/fonts/**/*.{woff,woff2}",
  "source/*.ico"
  ], {
  base: "source"
  })
  .pipe(gulp.dest("build"));
 });

 gulp.task("clean", function () {
  return del("build");
 });

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/js/*.js", gulp.series("script"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/img/**/.*", gulp.series("images"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
  });

gulp.task("start", gulp.series("css", "server"));

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "images",
  "script",
  "html"
  ));
