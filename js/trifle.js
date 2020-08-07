hljs.registerLanguage('trifle', function() {
	return {
		case_insensitive: false,
		keywords: 'for if while',
		contains: [
			{
				className: 'string',
				begin: '"',
				end: '"'
			},
			{
				className: 'string',
				begin: '\'',
				end: '\''
			}
		]
	}
});