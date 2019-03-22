/*jshint esversion: 6 */
/*
 * grunt-messages-js-localization
 * https://github.com/devilcius/grunt-messages-js-localization
 *
 * Copyright (c) 2019 Marcos
 * Licensed under the MIT license.
 */

'use strict';

const PropertiesReader = require('properties-reader');
const path = require('path');
const util = require('util');

module.exports = function (grunt) {


  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('messages_js_localization', 'Generates js localization files from spring boot messages_{lang}.properties files', function () {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        defaultLanguage: 'en',
        messagesVariableName: 'messages',
        messagesFilesRegex: /messages.+properties/        
    });

    function getJavascriptFileName(fileName) {
      if (fileName === 'messages.properties') {

        return `messages_${options.defaultLanguage}.js`;
      }

      return fileName.replace(".properties", ".js");
    }

    function unescapeUnicode(str) {
      return str.replace(/\\\\u([a-fA-F0-9]{4})/g, function (g, m1) {
        return String.fromCharCode(parseInt(m1, 16));
      });
    }
    console.log("OPTIONS", options);
    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      file.src.filter(function (file) {

        return file.match(options.messagesFilesRegex);
      }).forEach(function (filePath) {
        if (!grunt.file.exists(filePath)) {
          grunt.log.warn('Source file "' + filePath + '" not found.');
          return false;
        }
        let propertiesReader = new PropertiesReader(filePath);
        let jsMessagesFileName = getJavascriptFileName(path.parse(filePath).base);
        let jsFileContents = 'const ' + options.messagesVariableName + ' = ' + unescapeUnicode(util.inspect(propertiesReader.path()).replace(/\r?\n/g, '')) + ';';

        grunt.file.write(file.dest + '/' + jsMessagesFileName, jsFileContents);

        console.log(jsMessagesFileName + " file generated");
      });
    });
  });

};