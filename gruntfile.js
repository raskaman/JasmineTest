var fs = require('fs');
// Enter correct environment Sitecore Path to enable grunt-copy on watch
var sitecorePath = 'C:/inetpub/wwwroot/tpdevcd/Website';
var sitecorePathCM = 'C:/inetpub/wwwroot/tpdevcm/Website';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      test: {
        src: ['src/jquery.js', 'src/**/*.src.js'],
        options: {
          specs: 'src/test/*Spec.js',
          helpers: 'spec/helpers/*Helper.js',
        },
      },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', function () {
    grunt.task.run(['jasmine']);
  });
};
