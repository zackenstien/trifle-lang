module.exports = function array_values(arr) {
	if (typeof arr == 'object') {
		if (Array.isArray(arr)) {
			var outputArray = [];
            
			function search(array) {
				array.forEach(item => {
					if (Array.isArray(item)) {
						search(item);
					} else {
						outputArray.push(item);
					}
				});
			}

			search(arr);
			return outputArray;
		} else {
			console.error(`Expected array; got ${typeof arr}`);
			process.exit(1);
		}
	} else {
		console.error(`Expected array; got ${typeof arr}`);
		process.exit(1);
	}
};