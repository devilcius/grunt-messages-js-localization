/*
 * grunt-messages-js-localization
 * https://github.com/devilcius/grunt-messages-js-localization
 *
 * Copyright (c) 2019 Marcos
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    messages_js_localization: {
      default_options: {
        options: {
          defaultLanguage: 'en',
          messagesVariableName: 'messages',
          messagesFilesRegex: /messages.+properties/          
        },
        files: {
          'tmp': ['test/fixtures/*.properties']
        }
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'messages_js_localization', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
