const Token = require('./lib/Token');

var patterns = [
	["wspace", /^\s+/],
	["iden", /^([a-zA-Z_]\w*)/],
	["var", /^(\$[a-zA-Z_]\w*)/],
	["oparen", /^\(/],
	["cparen", /^\)/],
	["float", /^-?\d+\.\d+/],
	["int", /^-?\d+/],
	["obrace", /^\{/],
	["cbrace", /^\}/],
	["obracket", /^\[/],
	["cbracket", /^\]/],
	// match two quotes containing any number of escaped-backslash, escaped quote, or any non-quote characters.
	["string", /^("(\\\\|\\"|[^"])*"|'(\\\\|\\'|[^"])*')/],
	/*
	["string1", /^"(\\\\|\\"|[^"])*"/],
	["string2", /^'(\\\\|\\'|[^"])*'/],
	*/
	["comment", /^\/\/.*/],
	["other", /^[\s\S]/],
];

// finds the next token in the input string, starting at input[i], using the given token patterns.
// returns a token object and the index that the token ends.
function read_token(input, i) {
	for (var j = 0; j < patterns.length; j++) {
		var regex = patterns[j][1];
		var result = input.slice(i).match(regex);
		if (result !== null) {
			var text = result[0];
			var token = [patterns[j][0], text];
			return [token, i + text.length];
		}
	}
}

// takes an input string and a list of token patterns and tokenizes the string.
// returns a list of tokens.
function lexer(input) {
	var tokens = [];
	for (var i = 0; i < input.length;) {
		var token = read_token(input, i);
		i = token[1];
		tokens.push(token);
	}

	return tokens.filter(val => {
		if (val[0][0] == 'wspace')
			return false;
		return true;
	}).map(tok => {
		if (tok[0][0] !== 'string')
			return new Token(tok[0][0], tok[0][1]);
		else
			return new Token(tok[0][0], tok[0][1].slice(1, -1));
	});
}

module.exports = lexer;