/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

var paths =   {
      // paths serve as alias
      'npm:': 'node_modules/'
};

var map = {
    // Mapping the css loader
      css: 'node_modules/systemjs-plugin-css/css.js',
      // Mapping the src folder of develompent
      app: 'app',
      //app for deployment in prod
      //app: 'src/js',
      // angular bundles
      'moment': 'npm:moment/moment.js',
      'ng2-bootstrap': 'npm:ng2-bootstrap/bundles/ng2-bootstrap.umd.js',
      '@angular': 'npm:@angular',
      '@angular2-material': 'npm:@angular2-material',
      'angular-disable-all': 'npm:@angular-disable-all/dist/angular-disable-all.min.js',
      // other libraries
      'localStorage': 'npm:localStorage/lib/localStorage.js',
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
      'angular-svg-round-progressbar': 'npm:angular-svg-round-progressbar/build/roundProgress.min.js',
      "materialize-css": "npm:/materialize-css"
};
// packages tells the System loader how to load when no filename and/or no extension
var packages = {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      }
};

var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router'
];

// Individual files (~300 requests):
function packIndex(pkgName) {
  packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
}
// Bundled (~40 requests):
function packUmd(pkgName) {
  packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
}
// Most environments should use UMD; some (Karma) need the individual index files
var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
// Add package entries for angular packages
ngPackageNames.forEach(setPackageConfig);

var config = {
  paths: paths,
  map: map,
  packages: packages
};

System.config(config);  

})(this);