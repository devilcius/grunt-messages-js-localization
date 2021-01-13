/*jshint esversion: 6 */
/*
 * grunt-messages-js-localization
 * https://github.com/devilcius/grunt-messages-js-localization
 *
 * Copyright (c) 2020 Marcos
 * Licensed under the MIT license.
 */

'use strict';
const path = require('path');
const util = require('util');
const fs = require('fs');

module.exports = function (grunt) {


    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('messages_js_localization', 'Generates js localization files from spring boot messages_{lang}.properties files', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        let options = this.options({
            defaultLanguage: 'en',
            messagesVariableName: 'messages',
            messagesFilesRegex: /messages.+properties/
        });

        const getJavascriptFileName = function (fileName) {
            if (fileName === 'messages.properties') {

                return `messages_${options.defaultLanguage}.js`;
            }

            return fileName.replace(".properties", ".js");
        }

        const unescapeUnicode = function (str) {
            return str.replace(/\\\\u([a-fA-F0-9]{4})/g, function (g, m1) {
                return String.fromCharCode(parseInt(m1, 16));
            });
        }

        const propertiesToJson = function (keysArray, value, json) {
            if (!json) {
                json = {};
            }
            if (!keysArray) {
                return json;
            }
            if (!value) {
                return json;
            }
            let parent = json;
            for (let i = 0; i < keysArray.length; i++) {
                let name = cleanse(keysArray[i]);
                if (i === keysArray.length - 1) {
                    parent[name] = value;
                } else {
                    parent[name] = parent[name] || {};
                    parent = parent[name];
                }
            }
            return json;
        };

        const cleanse = function (name) {
            try {
                return name.split(' ').join('');
            } catch (e) {
                return name;
            }

        }

        // Iterate over all specified file groups.
        this.files.forEach(function (file) {
            file.src.filter(function (file) {

                return file.match(options.messagesFilesRegex);
            }).forEach(function (filePath) {
                if (!grunt.file.exists(filePath)) {
                    grunt.log.warn('Source file "' + filePath + '" not found.');
                    return false;
                }
                let propertiesJson = {};
                try {
                    var propertiesText = fs.readFileSync(filePath, 'utf8');

                    if (propertiesText) {
                        try {
                            let lines = propertiesText.split('\n') || [];
                            lines = lines.filter(line => (line && line.length));
                            lines.forEach(line => {
                                const pair = line.split('=');
                                const value = pair[1];
                                var propertyEntries = pair[0].split('.');
                                propertiesJson = propertiesToJson(propertyEntries, value, propertiesJson);
                            });

                        } catch (error) {
                            console.log(error);
                        }
                    }
                } catch (e) {
                    console.log('Error:', e.stack);
                }
                let jsMessagesFileName = getJavascriptFileName(path.parse(filePath).base);
                let jsFileContents = 'const ' + options.messagesVariableName + ' = ' + unescapeUnicode(util.inspect(propertiesJson, {showHidden: false, depth: null}).replace(/\r?\n/g, '')) + ';';

                grunt.file.write(file.dest + '/' + jsMessagesFileName, jsFileContents);

                console.log(jsMessagesFileName + " file generated");
            });
        });
    });

};