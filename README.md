format-package-json
===================

Module attempts to detect the spacing used, the final line ending and if it's comma first or not.

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

