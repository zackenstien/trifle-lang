const lexer = require('./lexer'),
	  fs = require('fs'),
	  Token = require('../lib/Token'),
	  require_folder = require('../lib/require_folder'),
	  merge = require('../lib/merge'),
	  path = require('path');

let preErr = console.error;
console.error = function(str) {
	preErr('ERROR: ' + str);
};

function convertToToken(tok) {
	if (tok === undefined)
		return new Token('null', 'null');
	

	if (typeof tok == 'string')
		return new Token('string', tok);
	else if (typeof tok == 'number') {
		if (Number.isInteger(tok))
			return new Token('int', tok);
		else
			return new Token('float', tok);
	} else if (typeof tok == 'boolean')
		return new Token('iden', tok.toString());
}

function convertToLiteral(tok, vars) {
	/*if (!(tok instanceof Token))
		tok = convertToToken(tok);*/

	if (typeof tok.lexeme === undefined)
		return tok;
	if (tok == undefined)
		return null;
	if (typeof tok !== 'object')
		return tok;
	if (Array.isArray(tok))
		return tok;

	if (tok.name === 'string')
		return tok.lexeme.replace('\\n', '\n');
	else if (tok.name === 'iden') {
		if (tok.lexeme === 'false')
			return false;
		else if (tok.lexeme === 'true')
			return true;
		else
			return tok.lexeme;
	} else if (tok.name === 'int')
		return parseInt(tok.lexeme);
	else if (tok.name === 'float')
		return parseFloat(tok.lexeme);
	else if (tok.name == 'var') {
		if (vars[tok.lexeme] !== undefined) {
			if (Array.isArray(vars[tok.lexeme]))
				return vars[tok.lexeme];
			return convertToLiteral(vars[tok.lexeme]);
		} else {
			console.error(`Variable ${tok.lexeme} doesn't exist`);
			process.exit(1);
		}
	} else if (tok.lexeme == undefined) {
		return tok;
	}
}

function convertListToLiterals(l, vars) {
	return l.map(arg => {
		return convertToLiteral(arg, vars);
	});
}

function evalNumber(i, tokenStream, vars, env) {
	var firstc = tokenStream[i];
	var n = null;
	var startPos = i;
	var endPos;
	var nextOp = null;

	if (firstc.lexeme == '(') {
		var x = evalNumber(i + 1, tokenStream, vars, env);
		n = x.outputs;
		startPos = x.i + 1;
	}
	
	for (var argi = startPos; argi < tokenStream.length;) {
		var currentTok = tokenStream[argi];

		if (firstc.lexeme == '(') {
			if (currentTok.lexeme == ')') {
				endPos = argi;
				break;
			}
		}

		if (currentTok.name == 'var') {
			if (vars[currentTok.lexeme] !== undefined) {
				if (typeof vars[currentTok.lexeme] == 'number') {
					currentTok = convertToToken(vars[currentTok.lexeme]);
					console.log('VAR', currentTok);
				} else {
					console.error(`Variable ${currentTok.lexeme} is not a number`);
					process.exit(1);
				}
			} else {
				console.error(`Variable ${currentTok.lexeme} doesn't exist`);
				process.exit(1);
			}
		}

		if (currentTok.lexeme == '(') {
			var segment = evalNumber(argi, tokenStream, vars, env);
			currentTok = convertToToken(segment.outputs);
			argi = segment.i;
		}

		if (currentTok.name == 'int' || currentTok.name == 'float') {
			if (!n) {
				n = convertToLiteral(currentTok);
				argi++;
			} else if (nextOp == '+') {
				if (currentTok.name == 'int' || currentTok.name == 'float') {
					n += convertToLiteral(currentTok);
					nextOp = null;
					argi++;
				}
			} else if (nextOp == '-') {
				if (currentTok.name == 'int' || currentTok.name == 'float') {
					n -= convertToLiteral(currentTok);
					nextOp = null;
					argi++;
				}
			} else if (nextOp == '/') {
				if (currentTok.name == 'int' || currentTok.name == 'float') {
					n = n / convertToLiteral(currentTok);
					nextOp = null;
					argi++;
				}
			} else if (nextOp == '*') {
				if (currentTok.name == 'int' || currentTok.name == 'float') {
					n = n * convertToLiteral(currentTok);
					nextOp = null;
					argi++;
				}
			} else {
				argi++;
			}
		} else if (currentTok.lexeme == '+') {
			if (nextOp) {
				console.error(`Expected 'number', got '${currentTok.lexeme}'`);
				process.exit(1);
			}
			argi++;
			nextOp = '+';
		} else if (currentTok.lexeme == '-') {
			if (nextOp) {
				console.error(`Expected 'number', got '${currentTok.lexeme}'`);
				process.exit(1);
			}
			argi++;
			nextOp = '-';
		} else if (currentTok.lexeme == '/') {
			if (nextOp) {
				console.error(`Expected 'number', got '${currentTok.lexeme}'`);
				process.exit(1);
			}
			argi++;
			nextOp = '/';
		} else if (currentTok.lexeme == '*') {
			if (nextOp) {
				console.error(`Expected 'number', got '${currentTok.lexeme}'`);
				process.exit(1);
			}
			argi++;
			nextOp = '*';
		} else {
			endPos = argi - 1;
			break;
		}
	}

	return {i: endPos, outputs: n};
}

function evalFunction(envItem, i, tokenStream, vars, env, check) {
	var args = [];
	var current = 0; // 1 = argument, 0 = comma
	var startIndex = i + 1;
	var endIndex;

	if (tokenStream[i + 1]) {
		if (tokenStream[i + 1].lexeme == '(') {
			for (var argi = i + 2; argi < tokenStream.length;) {
				var currentArg = tokenStream[argi];

				if (currentArg.lexeme == ')') {
					if ((!startIndex - argi == 2) && current == 0) {
						console.error('Expected argument, got \')\'');
						process.exit(1);
					}
					endIndex = argi;
					break;
				}

				if (current == 0) {
					current = 1;

					if (currentArg.name == 'other') {
						console.error(`Expected argument; got '${currentArg.lexeme}'`);
						process.exit(1);
					} else {
						if (currentArg.name == 'iden') {
							if (env[currentArg.lexeme] !== undefined) {
								// Call function
								if (typeof env[currentArg.lexeme] == 'function') {
									let res = evalFunction(env[currentArg.lexeme], argi, tokenStream, vars, env, false);
									args.push(res.output);
									argi = res.i + 1;
								}
							} else {
								console.error(`Method ${currentArg.lexeme} doesn't exist`);
								process.exit(1);
							}
						} else if (currentArg.name == 'int' || currentArg.name == 'float' || currentArg.lexeme == '(') {
							let num = evalNumber(argi, tokenStream, vars, env);
							args.push(num.outputs);
							argi = num.i + 1;
						} else if (currentArg.name == 'var') {
							if (vars[currentArg.lexeme] !== 'undefined') {
								if (typeof currentArg.lexeme == 'number') {
									let num = evalNumber(argi, tokenStream, vars, env);
									args.push(num.outputs);
									argi = num.i + 1;
								} else {
									args.push(vars[currentArg.lexeme]);
									argi++;
								}
							} else {
								console.error(`Variable ${currentArg.lexeme} doesn't exist`);
								process.exit(1);
							}
						} else {
							argi++;
							args.push(currentArg);
						}
					}
				} else if (current == 1) {
					current = 0;
					argi++;
				}
			}
		} else {
			if (check) {
				console.error(`Expected '('; got '${tokenStream[i + 1].lexeme}'`);
				process.exit(1);
			}
		}
	} else {
		if (check) {
			console.error('Expected \'(\'; got \'<EOF>\'');
			process.exit(1);
		}
	}

	if (check) {
		if (tokenStream[endIndex + 1]) {
			if (tokenStream[endIndex + 1].lexeme == ';') {
				endIndex++;
			} else {
				console.error(`Expected ';'; got '${tokenStream[i + 1].lexeme}'`);
				process.exit(1);
			}
		} else {
			console.error('Expected \';\'; got \'<EOF>\'');
			process.exit(1);
		}
	}

	args = convertListToLiterals(args, vars);

	let funcEnv = {vars};
	let output = envItem.apply(funcEnv, args);
	return {
		i: endIndex,
		output,
		env: funcEnv
	};
}

function compile(tokenStream, vmEnv) {
	return function() {
		let vars = {};

		for (var i = 0; i < tokenStream.length;) {
			let currentTok = tokenStream[i];
			if (currentTok.name == 'comment')
				i++;
			else if (currentTok.name == 'var') {
				if (tokenStream.length > i + 1) {
					if (tokenStream[i + 1].lexeme == '=') {
						if (tokenStream.length > i + 2) {
							if (tokenStream[i + 2].name !== 'other') {
								if (tokenStream[i + 2].name == 'iden') {
									if (vmEnv[tokenStream[i + 2].lexeme] !== undefined) {
										var envItem = vmEnv[tokenStream[i + 2].lexeme];
										var data = evalFunction(envItem, i + 2, tokenStream, vars, vmEnv, true);
										vars = data.env.vars;
										vars[currentTok.lexeme] = data.output;
										i = data.i + 1;
									} else {
										console.error(`Method '${tokenStream[i + 2].lexeme}' doesn't exist`);
									}
								} else if (tokenStream.length > i + 3) {
									if (tokenStream[i + 3].lexeme == ';') {
										vars[currentTok.lexeme] = convertToLiteral(tokenStream[i + 2]);
										i += 4;
									} else {
										console.error(`Expected ';'; got '${tokenStream[i + 3]}'`);
										process.exit(1);
									}
								} else {
									console.error('Expected \';\'; got \'<EOF>\'');
									process.exit(1);
								}
							} else {
								console.error('Expected \'<VALUE>\'; got \'<EOF>\'');
								process.exit(1);
							}
						} else {
							console.error('Expected \'<VALUE>\'; got \'<EOF>\'');
							process.exit(1);
						}
					} else {
						console.error(`Expected '='; got '${tokenStream[i + 1].lexeme}'`);
						process.exit(1);
					}
				} else {
					console.error('Expected \'=\'; got \'<EOF>\'');
					process.exit(1);
				}
			} else if (currentTok.name == 'iden') {
				if (vmEnv[currentTok.lexeme] !== undefined) {
					let envItem = vmEnv[currentTok.lexeme];
					if (typeof envItem == 'function') {
						var outputs = evalFunction(envItem, i, tokenStream, vars, vmEnv, true);
						vars = outputs.env.vars;
						i = outputs.i + 1;
					}
				} else {
					console.error(`Method '${currentTok.lexeme}' doesn't exist`);
					process.exit(1);
				}
			}
		}
	};
}

function parser(tokenStream, env) {
	compile(tokenStream, env)();
}

let vmEnv = {
	println: function(...args) {
		console.log.apply({}, args);
	}
};

let arrayLib = require_folder(path.join(__dirname, '../array'));
vmEnv = merge(vmEnv, arrayLib);

console.time('RUNTIME');
let toks = lexer(fs.readFileSync('./example.tri').toString());
parser(toks, vmEnv);
console.timeEnd('RUNTIME');