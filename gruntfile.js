module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      test: {
        src: ['src/js/jquery.js', 'src/js/*.src.js'],
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
