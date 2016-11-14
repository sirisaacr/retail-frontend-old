var gulp = require('gulp'),
    path = require('path'),
    Builder = require('systemjs-builder'),
    ts = require('gulp-typescript'),
    sourcemaps  = require('gulp-sourcemaps');

var tsProject = ts.createProject('tsconfig.json');

var appDev = 'app'; // where your ts files are, whatever the folder structure in this folder, it will be recreated in the below 'dist/app' folder
var appProd = 'src/js';

/** first transpile your ts files */
gulp.task('ts', () => {
    return gulp.src(appDev + '/**/*.ts')
        .pipe(sourcemaps.init({
            loadMaps: true
        })) 
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(appProd));
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
        .buildStatic(appProd + '/main.js', appProd + '/bundle.js', { minify: true, sourceMaps: true})
        .then(function() {
            console.log('Build complete');
        })
        .catch(function(err) {
            console.log('Build error');
            console.log(err);
        });
});

/** this runs the above in order. uses gulp4 */
gulp.task('build', ['ts', 'bundle']);




// var gulp = require('gulp');
// var sourcemaps = require('gulp-sourcemaps');
// var concat = require('gulp-concat');
// var systemjsBuilder = require('systemjs-builder');

// // Generate systemjs-based bundle (src/app.js)
// gulp.task('bundle:app', function() {
//   var builder = new systemjsBuilder('', './systemjs.config.js');
//   return builder.buildStatic('app', 'src/app.js');
// });

// // Copy and bundle dependencies into one file (vendor/vendors.js)
// // system.config.js can also bundled for convenience
// gulp.task('bundle:vendor', function () {
//     return gulp.src([
//         "node_modules/core-js/client/shim.min.js",
//         "node_modules/zone.js/dist/zone.js",
//         'node_modules/reflect-metadata/Reflect.js',
//         'node_modules/systemjs/dist/system.src.js'
//       ])
//         .pipe(concat('vendors.js'))
//         .pipe(gulp.dest('src'));
// });

// // Copy dependencies loaded through SystemJS into dir from node_modules
// gulp.task('copy:vendor', function () {
//   gulp.src(['node_modules/rxjs/**/*'])
//     .pipe(gulp.dest('public/lib/js/rxjs'));

//   gulp.src(['node_modules/angular2-in-memory-web-api/**/*'])
//     .pipe(gulp.dest('public/lib/js/angular2-in-memory-web-api'));
  
//   return gulp.src(['node_modules/@angular/**/*'])
//     .pipe(gulp.dest('public/lib/js/@angular'));
// });

// gulp.task('vendor', ['bundle:vendor', 'copy:vendor']);
// gulp.task('app', ['bundle:app']);

// // Bundle dependencies and app into one file (app.bundle.js)
// gulp.task('bundle', ['vendor', 'app'], function () {
//     return gulp.src([
//         'src/app.js',
//         'src/vendors.js'
//         ])
//     .pipe(concat('app.bundle.js'))
//     .pipe(gulp.dest('./src'));
// });

// gulp.task('default', ['bundle']);