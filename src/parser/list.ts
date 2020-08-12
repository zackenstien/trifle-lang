import { Token } from '../Token';
import { syntaxError } from '../error/stdErrors';

export function list(start: string, end: string, i: number, tokStream: Token[]) {
    let list: Token[] = [];
    let startPosition: number = i;
    let endPosition: number;
    let expecting: number = 0; // 0 = argument, 1 = comma.

    if (tokStream[i].lexeme == start)
        startPosition++;
    else {
        syntaxError(`Expected '${start}', got '${tokStream[i].lexeme}'. Is it a typo?`, tokStream[i].filename, tokStream[i].lineNumber, tokStream[i].characterIndex);
    }
    
    for (let argi: number = startPosition; argi < tokStream.length;) {
        let currentTok: Token = tokStream[argi];

        if (currentTok.lexeme == end) {
            if (argi !== startPosition && expecting == 0) {
                syntaxError(`Expected argument, got '${end}'. Is it a typo?`, tokStream[i].filename, tokStream[i].lineNumber, tokStream[i].characterIndex);
                process.exit(1);
            }
            endPosition = argi;
            break;
        }

        if (expecting == 0) {
            expecting = 1;
            list.push(currentTok);
            argi++;
        } else if (expecting == 1) {
            expecting = 0;

            if (currentTok.lexeme !== ',') {
                syntaxError(`Expected ',', got '${currentTok.lexeme}'. Is it a typo?`, tokStream[i].filename, tokStream[i].lineNumber, tokStream[i].characterIndex);
            }
            argi++;
        }
    }

    if (endPosition) {
        return {list, i: endPosition};
    } else {
        console.error(`Expected '${end}', got '<EOF>'.`);
        process.exit(1);
    }
}
export default list;