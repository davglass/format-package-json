var vows = require('vows'),
    assert = require('assert'),
    path = require('path'),
    write = require('../'),
    fs = require('fs'),
    read = require('../').read,
    file = path.join(__dirname, './json/4space.json')

fs.writeFileSync(file, JSON.stringify(require(file), null, 4));

var start = fs.readFileSync(file, 'utf8')

var tests = {
    'should read 4 space package.json': {
        topic: function () {
            read(file, this.callback);
        },
        'as four spaces': function (d) {
            assert.equal(4, d.spaces);
        },
        'as four space indent': function (d) {
            assert.equal('    ', d.indent);
        },
        'and NOT have a new line at end': function (d) {
            assert.equal('', d.ending);
        }
    },
    'write': {
        topic: function () {
            write(file, {
                name: "four-space"
            }, this.callback);
        },
        'and format properly': function () {
            var end = fs.readFileSync(file, 'utf8')
            assert.equal(start, end)
        }
    }
}

vows.describe('read 4 space, comma last').addBatch(tests).export(module)
