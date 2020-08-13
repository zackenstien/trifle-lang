import { Token } from '../Token';
import { syntaxError } from '../error/stdErrors';
import { ASTArray } from '../ast/ASTArray';
import ASTItem from '../ast/ASTItem';

export function list(start: string, end: string, i: number, tokStream: Token[]) {
    let retList: (Token|ASTItem)[] = [];
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
            if (currentTok.lexeme == '[') {
                let item = list('[', ']', argi, tokStream);
                retList.push(new ASTArray(item.list, currentTok.filename))
                argi = item.i + 1;
                continue;
            }
            retList.push(currentTok);
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
        return {list: retList, i: endPosition};
    } else {
        console.error(`Expected '${end}', got '<EOF>'.`);
        process.exit(1);
    }
}
export default retList;