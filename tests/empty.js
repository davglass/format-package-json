var vows = require('vows'),
    assert = require('assert'),
    path = require('path'),
    read = require('../').read

var tests = {
    'should read empty json': {
        topic: function () {
            read(path.join(__dirname, './json/empty.json'), this.callback);
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

vows.describe('read empty json').addBatch(tests).export(module)

