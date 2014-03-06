var vows = require('vows'),
    assert = require('assert'),
    path = require('path'),
    read = require('../').read

var tests = {
    'should error on bad json': {
        topic: function () {
            var self = this;
            read(path.join(__dirname, './json/bad.json'), self.callback);
        },
        'should return defaults': function (d) {
            assert.equal(d.spaces, 2);
        }
    }
}

vows.describe('no file').addBatch(tests).export(module)

