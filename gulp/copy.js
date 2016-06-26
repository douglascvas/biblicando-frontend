const paths = require('../paths');
const changed = require('gulp-changed');
const gulp = require('gulp');

function processHtml() {
  var result = gulp.src(paths.html)
    .pipe(changed(paths.outputMain, {extension: '.html'}))
    .pipe(gulp.dest(paths.outputMain));
  result.on('error', error => console.log("## ERROR - ", error));
  return result;
}

function processCss() {
  var result = gulp.src(paths.css)
    .pipe(changed(paths.outputMain, {extension: '.css'}))
    .pipe(gulp.dest(paths.outputMain));
  result.on('error', error => console.log("## ERROR - ", error));
  return result;
}

module.exports = {
  main: function copyMain() {
    return Promise.all([processHtml(), processCss()]);
  },
  img: function copyImg() {
    var result = gulp.src(paths.img)
      .pipe(changed(paths.outputImage))
      .pipe(gulp.dest(paths.outputImage));
    result.on('error', error => console.log("## ERROR - ", error));
    return result;
  },
  font: function copyFont() {
    var result = gulp.src(paths.font)
      .pipe(changed(paths.outputFont))
      .pipe(gulp.dest(paths.outputFont));
    result.on('error', error => console.log("## ERROR - ", error));
    return result;
  },
  test: function copyTest() {
    return gulp.src(paths.test)
      .pipe(changed(paths.outputTest))
      .pipe(gulp.dest(paths.outputTest));
  }
};