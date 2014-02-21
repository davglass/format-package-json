format-package-json
===================

Module attempts to detect the spacing used, the final line ending.

It will then attempt to reformat an `Object` back into this string and save the file.

usage
-----

```js

var format = require('format-package-json')


format('/path/to/package.json', function (err, data) {
    //data - the string that it wrote

    //That's it
})
```

sync
----

  * `format.sync`
  * `format.readSync`
  * `format.writeSync`

build
-----

[![Build Status](https://travis-ci.org/davglass/format-package-json.png?branch=master)](https://travis-ci.org/davglass/format-package-json)
