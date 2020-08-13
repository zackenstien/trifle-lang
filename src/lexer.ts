import { Token } from './Token';
import { Regex } from './Regex';

let patterns: Regex[] = [
    new Regex("line", /^\r?\n/),
	new Regex("wspace", /^\s+/),
	new Regex("iden", /^([a-zA-Z_]\w*)/),
	new Regex("oparen", /^\(/),
	new Regex("cparen", /^\)/),
	new Regex("float", /^-?\d+\.\d+/),
	new Regex("int", /^-?\d+/),
	new Regex("obrace", /^\{/),
    new Regex("cbrace", /^\}/),
	new Regex("obracket", /^\[/),
    new Regex("cbracket", /^\]/),
	// match two quotes containing any number of escaped-backslash, escaped quote, or any non-quote characters.
	new Regex("string", /^("(\\\\|\\"|[^"])*"|'(\\\\|\\'|[^'])*')/),
    new Regex("comment", /^\/\/.*/),
	new Regex("other", /^[\s\S]/)
];

export function lexer(str: string, filename: string): Token[] {
    let tokens: Token[] = [];
    let lineNumber: number = 1;
    let char: number = 0;

tokenParse: for (let i = 0; i < str.length;) {
        for (let x = 0; x < patterns.length; x++) {
            let s: string = str.slice(i);
            let regex: Regex = patterns[x];
            let match = regex.pattern.exec(s);

            if (match !== null) {
                if (regex.name == 'line') {
                    lineNumber++;
                    char = 0;
                    i += match[0].length;
                    continue tokenParse;
                } else if (regex.name == 'wspace') {
                    i++;
                    char += 1;
                    continue tokenParse;
                }

                tokens.push(new Token(regex.name, match[0], lineNumber, char, filename));
                char += match[0].length;
                i += match[0].length;
                continue tokenParse;
            }
        }
    }

    return tokens;
}

export default lexer;