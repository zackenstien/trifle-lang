const path = require('path');

function r(lib) {
    return require(path.join(__dirname, './array', lib));
}

module.exports = {
    array: r('array'),
    array_length: r('array_length'),
    array_values: r('array_values')
};