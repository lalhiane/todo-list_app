const gulp = require("gulp"),
    notify = require("gulp-notify"),
    sourcemaps = require("gulp-sourcemaps"),
    sass = require("gulp-sass")(require("sass")),
    livereload = require("gulp-livereload"),
    ts = require('gulp-typescript');

// Html Task
gulp.task("markups", function () {
  return gulp
    .src("src/*.html")
    .pipe(gulp.dest("dist"))
    .pipe(notify("Html (markups) Task Is Done!"))
    .pipe(livereload());
});

// Css Task
gulp.task("styles", function () {
  return (
    gulp
      .src("src/sass/**/*.scss")
      .pipe(sourcemaps.init("."))
      .pipe(sass())
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("dist/css"))
      .pipe(notify("Css (styles) Task Is Done!"))
      .pipe(livereload())
  );
});

// JavaScript (TypeScript) Task:
gulp.task("scripts", function () {
    return gulp.src("src/typescript/*.ts")
    .pipe(sourcemaps.init("."))
    .pipe(ts({
        noImplicitAny: true,
        outFile: 'main.js'
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js"))
    .pipe(notify("JavaScript (TypeScript) Task Is Done!"))
    .pipe(livereload())
});

// Watch Tasks
gulp.task("watch", function () {
  require("./server.js");
  livereload.listen();
  gulp.watch("src/*.html", gulp.series("markups"));
  gulp.watch("src/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("src/typescript/*.ts", gulp.series("scripts"));
});