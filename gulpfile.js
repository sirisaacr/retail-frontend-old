var gulp = require('gulp'),
    Builder = require('systemjs-builder'),
    ts = require('gulp-typescript'),
    sourcemaps  = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    cssMin = require('gulp-css'),
    del = require('del'),
    sass = require('gulp-sass'),
    purify = require('gulp-purifycss');

var tsProject = ts.createProject('tsconfig.json');

var appDev = 'app/'; // where your ts files are, whatever the folder structure in this folder, it will be recreated in the below 'dist/app' folder
var appProd = 'src/';

/** first transpile your ts files */
gulp.task('ts', () => {
    return gulp.src(appDev + '**/*.ts')
                .pipe(tsProject())
                .pipe(gulp.dest(appProd+'js'));
});

gulp.task('sass', function () {
  return gulp.src(appDev+'**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(appDev+'css/'));
});

gulp.task('cssMinfy', function(){
  return gulp.src(appDev+'css/**/*.css')
    .pipe(concat('style.min.css'))
    .pipe(cssMin())
    .pipe(gulp.dest(appProd+'css'));
});

/** then bundle */
gulp.task('bundle', function() {
    // optional constructor options
    // sets the baseURL and loads the configuration file
    var builder = new Builder('', './systemjs.config.js');

    /*
       the parameters of the below buildStatic() method are:
           - your transcompiled application boot file (the one wich would contain the bootstrap(MyApp, [PROVIDERS]) function - in my case 'dist/app/boot.js'
           - the output (file into which it would output the bundled code)
           - options {}
    */
    return builder
        .buildStatic(appProd + 'js/main.js', appProd + 'js/bundle.js', { minify: true, sourceMaps: true})
        .then(function() {
            del.sync([appProd+'js/**', '!'+appProd+'js', '!'+appProd+'js/bundle.js*', '!'+appProd+'js/jquery.min.js*']);
            console.log('Build complete');
        })
        .catch(function(err) {
            console.log('Build error');
            console.log(err);
        });
});

gulp.task('css', ['sass', 'cssMinfy']);

gulp.task('build', ['ts', 'bundle']);

