'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.messages_js_localization = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  english_file: function(test) {
    test.expect(1);

    var actualEnglish = grunt.file.read('tmp/messages_en.js');
    var expectedEnglish = grunt.file.read('test/expected/messages_en.js');
    test.equal(actualEnglish, expectedEnglish, 'bad english js file.');

    test.done();
  },
  french_file: function(test) {
    test.expect(1);
    var actualFrench = grunt.file.read('tmp/messages_fr.js');
    var expectedFrench = grunt.file.read('test/expected/messages_fr.js');
    test.equal(actualFrench, expectedFrench, 'bad french js file.');

    test.done();
  },
  spanish_file: function(test) {
    test.expect(1);
    var actualSpanish = grunt.file.read('tmp/messages_es.js');
    var expectedSpanish = grunt.file.read('test/expected/messages_es.js');
    test.equal(actualSpanish, expectedSpanish, 'bad spanish js file.');

    test.done();
  },
};
