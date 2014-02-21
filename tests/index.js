var vows = require('vows'),
    assert = require('assert'),
    path = require('path'),
    read = require('../').read

var tests = {
    'should read current package.json': {
        topic: function () {
            read(path.join(__dirname, '../package.json'), this.callback);
        },
        'as two spaces': function (d) {
            assert.equal(2, d.spaces);
        },
        'as two space indent': function (d) {
            assert.equal(2, d.indent.length);
        },
        'and have new line at end': function (d) {
            assert.equal('\n', d.ending);
        }
    }
}

vows.describe('read 2 space comma last').addBatch(tests).export(module)
