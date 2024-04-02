const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const svgSprite = require('gulp-svg-sprite');
const webpackStream = require('webpack-stream');

function browsersync() {
  browserSync.init({
    server: 'src/',
    notify: false,
  });
}

const config = {
  mode: {
    css: {
      render: {
        css: true,
      },
    },
  },
};

function buildSvg() {
  return src('src/assets/images/icons/*.svg')
    .pipe(svgSprite(config))
    .pipe(dest('dist/assets/images/icons'))
    .pipe(dest('src/assets/images/icons'));
}

function buildSass() {
  return src('src/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(sourcemaps.write('.'))
    .pipe(dest('src/styles'))
    .pipe(dest('dist/styles'))
    .pipe(browserSync.stream());
}

function html() {
  return src('src/**/*.html').pipe(dest('dist/')).pipe(browserSync.stream());
}

function serve() {
  watch('src/**/*.scss', buildSass);
  watch('src/**/*.html', html);
}

function copyFonts() {
  return src(['src/assets/fonts/**/*.*'], { encoding: false }).pipe(dest('dist/assets/fonts/'));
}

function copyImg() {
  return src(['src/assets/images/**/*.{png,gif}'], { encoding: false }).pipe(dest('dist/assets/images/'));
}

function cleanDist() {
  return del('dist/**/*', { force: true });
}

function buildJs() {
  return src('src/index.js')
    .pipe(webpackStream(require('./webpack.config')))
    .pipe(dest('dist/js'))
    .pipe(dest('src/js'))
    .pipe(browserSync.stream());
}

exports.clean = series(cleanDist);
exports.build = series(cleanDist, buildSvg, buildSass, buildJs, html, copyFonts, copyImg);
exports.default = series([cleanDist, buildSvg, buildSass, buildJs], parallel(browsersync, serve));
