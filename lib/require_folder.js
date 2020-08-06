const fs = require('fs'),
      path = require('path');

module.exports = function require_folder(name) {
    let files = fs.readdirSync(name);
    let obj = {};

    files.forEach(file => {
        if (file.endsWith('.js')) {
            obj[path.basename(path.join(name, file), '.js')] = require(path.join(name, file));
        }
    });

    return obj;
}