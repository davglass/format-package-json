var vows = require('vows'),
    assert = require('assert'),
    path = require('path'),
    read = require('../').read

var tests = {
    'should error on bad json': {
        topic: function () {
            var self = this;
            read(path.join(__dirname, './json/bad.json'), function (err) {
                self.callback(null, err)
            });
        },
        'should error': function (d) {
            assert.equal(d.code, 'ENOENT');
        }
    }
}

vows.describe('no file').addBatch(tests).export(module)

