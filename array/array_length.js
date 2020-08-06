module.exports = function array_length(arr) {
    if (typeof arr == 'object') {
        if (Array.isArray(arr))
            return arr.length;
        else {
            console.error(`Expected array; got ${typeof arr}`);
            process.exit(1);
        }
    } else {
        console.error(`Expected array; got ${typeof arr}`);
        process.exit(1);
    }
}