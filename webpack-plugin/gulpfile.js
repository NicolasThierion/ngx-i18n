const eslint = require('gulp-eslint');
const gulp = require('gulp-help')(require('gulp'));
const ts = require('gulp-typescript');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');

const isparta = require('isparta');
const istanbul = require('gulp-istanbul');
const jsdoc = require('gulp-jsdoc3');
const mocha = require('gulp-mocha');
const sequence = require('run-sequence');
const plumber = require('gulp-plumber');

const ASSETS_FILES = ['src/assets/*'];
const GULP_FILE = ['gulpfile.js'];
const SRC_FILES = ['src/**/*.{js,ts}'];
const TEST_FILES = ['test/**/*.{js,ts}'];
const TEST_CASE_FILES = ['test/**/*.test.{js,ts}'];
const BUILD_DIR = 'dist';
const BUILD_COVERAGE_REPORT_DIR = `${BUILD_DIR}/coverage`;
const BUILD_SRC_DIR = `${BUILD_DIR}`;
const BUILD_JSDOC_DIR = `${BUILD_DIR}/jsdoc`;
const BUILD_ASSETS_DIR = `${BUILD_DIR}/`;

gulp.task('lint', 'Validates code with "eslint"', function (done) {
  gulp.src(GULP_FILE.concat(SRC_FILES, TEST_FILES))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('finish', done);
});

gulp.task('build:watch', function() {
  return sequence('compile', 'assets', watch);
});

function watch() {
  gulp.watch(SRC_FILES, ['compile']);
  gulp.watch(ASSETS_FILES, ['assets']);
}

gulp.task('clean', (done) => {
  del.sync(BUILD_DIR);
  done();
});

gulp.task('test', 'Runs tests and generates code coverage report', function (done) {
  gulp.src(SRC_FILES)
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(TEST_CASE_FILES)
        .pipe(mocha())
        .pipe(istanbul.writeReports({
          dir: BUILD_COVERAGE_REPORT_DIR
        }))
        .pipe(istanbul.enforceThresholds({
          thresholds: {
            global: 100
          }
        }))
        .on('finish', done);
    });
});

gulp.task('compile', 'Compiles source code from es6 to es5', () => {

  sequence('clean', 'assets', () => gulp.src(SRC_FILES)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(ts.createProject('tsconfig.json')())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(BUILD_SRC_DIR)));
});

gulp.task('assets', 'Compiles source code from es6 to es5', () => {
  return gulp.src(ASSETS_FILES)
    .pipe(gulp.dest(BUILD_ASSETS_DIR));
});

gulp.task('jsdoc', 'Generates jsdoc', function (done) {
  gulp.src(SRC_FILES, {read: false})
    .pipe(jsdoc({
      opts: {destination: BUILD_JSDOC_DIR},
      templates: {
        theme: 'cerulean'
      }
    }, done));
});

gulp.task('build', 'Builds source code: validates it and provides an artifacts', function (done) {
  sequence('lint', 'test', 'compile', 'jsdoc', done);
});

gulp.task('pre-commit', 'Being run automatically on a git pre-commit hook', ['build']);

gulp.task('ci', 'Being run on a CI', ['build']);

gulp.task('default', ['build']);
