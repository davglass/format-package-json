var fs = require('fs'),
    detectIndent = require('detect-indent'),
    os = require('os')

var read = function (file, cb) {
    fs.readFile(file, 'utf8', function (err, str) {
        if (err) return cb(err)
        var indent = detectIndent(str) || '  ',
            spaces = indent.length,
            cf = false,
            ending
        
        str = str.split('\n')
        str.forEach(function (line) {
            if (line.indexOf(',') > -1) {
                if (!line.match(/,$/)) {
                    cf = true
                }
            }
        })
        ending = (str[str.length - 1] === '') ? '\n' : ''
        cb(null, {
            indent: indent,
            spaces: spaces,
            cf: cf,
            ending: ending
        });
    })
}

var format = function (file, data, callback) {
    read(file, function (err, options) {
        /* istanbul ignore next */
        if (err) return callback(err)
        var str = JSON.stringify(data, null, options.spaces);
        if (options.cf) {
            str = str.split(/(,\n\s+)/)
                .map(function (e, i) {
                    return i % 2 ? '\n' + e.substring(4) + ', ' : e
                })
                .join('')
        }
        str += options.ending;
        fs.writeFile(file, str, 'utf8', function (err) {
            /* istanbul ignore next */
            if (err) return callback(err)
            callback(null, str)
        });
    });
}

format.read = read;

module.exports = format

