var fs = require('fs'),
    detectIndent = require('detect-indent'),
    os = require('os')

var readSync = function (file) {
    var str = fs.readFileSync(file, 'utf8');
    return process(str);
}

var writeSync = function (file, data, options) {
    var str = post(data, options);
    fs.writeFileSync(file, str, 'utf8');
    return str;
}

var sync = function (file, data) {
    var options = readSync(file)
    return writeSync(file, data, options);
}

var process = function (str) {
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
    return {
        indent: indent,
        spaces: spaces,
        cf: cf,
        ending: ending
    };
}

var read = function (file, cb) {
    fs.readFile(file, 'utf8', function (err, str) {
        if (err) return cb(err)
        cb(null, process(str));
    })
}

var post = function (data, options) {
    var str = JSON.stringify(data, null, options.spaces);
    if (options.cf) {
        str = str.split(/(,\n\s+)/)
            .map(function (e, i) {
                return i % 2 ? '\n' + e.substring(4) + ', ' : e
            })
            .join('')
    }
    str += options.ending
    return str;
}

var write = function (file, data, options, callback) {
    var str = post(data, options);
    fs.writeFile(file, str, 'utf8', function (err) {
        /* istanbul ignore next */
        if (err) return callback(err)
        callback(null, str)
    });
}

var format = function (file, data, callback) {
    read(file, function (err, options) {
        /* istanbul ignore next */
        if (err) return callback(err)
        write(file, data, options, callback)
    });
}

format.read = read
format.write = write

format.readSync = readSync
format.writeSync = writeSync
format.sync = sync

module.exports = format

