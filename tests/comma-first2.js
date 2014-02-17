var vows = require('vows'),
    assert = require('assert'),
    path = require('path'),
    write = require('../'),
    fs = require('fs'),
    read = require('../').read,
    file = path.join(__dirname, './json/commafirst2.json')

var start = fs.readFileSync(file, 'utf8')

var tests = {
    'should read comma-first package.json': {
        topic: function () {
            return write.readSync(file)
        },
        'as two spaces': function (d) {
            assert.equal(2, d.spaces);
        },
        'as two space indent': function (d) {
            assert.equal('  ', d.indent);
        },
        'and as comma-first': function (d) {
            assert.isTrue(d.cf)
        },
        'and have new line at end': function (d) {
            assert.equal('\n', d.ending);
        }
    },
    'write': {
        topic: function () {
            return write.sync(file, {
                name: "comma first - two",
                description: "This is a test",
                version: "1.2.3"
            });
        },
        'and format properly': function () {
            var end = fs.readFileSync(file, 'utf8')
            assert.equal(start, end)
        }
    }
}

vows.describe('read 2 space, comma first').addBatch(tests).export(module)

