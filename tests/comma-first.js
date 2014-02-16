var vows = require('vows'),
    assert = require('assert'),
    path = require('path'),
    read = require('../').read,
    file = path.join(__dirname, './json/commafirst.json')

var tests = {
    'should read comma-first package.json': {
        topic: function () {
            read(file, this.callback);
        },
        'as four spaces': function (d) {
            assert.equal(4, d.spaces);
        },
        'as four space indent': function (d) {
            assert.equal('    ', d.indent);
        },
        'and as comma-first': function (d) {
            assert.isTrue(d.cf)
        },
        'and have new line at end': function (d) {
            assert.equal('\n', d.ending);
        }
    }
}

vows.describe('read 4 space, comma first').addBatch(tests).export(module)
