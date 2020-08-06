module.exports = function merge(...objects) {
    return Object.assign.apply(null, [{}].concat(objects));
}