import { Token } from './Token';
import { lexer } from './lexer';

// Parser Helpers
import { list } from './parser/list';

// Trifle Error
import { syntaxError } from './error/stdErrors';

// AST Items
import { ASTItem } from './ast/ASTItem';
import { ASTFunctionCall } from './ast/ASTFunctionCall';

export function parseAST(tokStream: Token[]): ASTItem[] {
    let AST: ASTItem[] = [];

    for (let i: number = 0; i < tokStream.length;) {
        let currentTok: Token = tokStream[i];

        if (currentTok.name == "iden") {
            if (tokStream[i + 1]) {
                let args = list('(', ')', i + 1, tokStream);
                AST.push(new ASTFunctionCall(currentTok.lexeme, args.list, currentTok.filename));
                i = args.i + 1;

                if (tokStream[i] && tokStream[i].lexeme == ';')
                    i++;
            }
        } else {
            syntaxError(`Unexpected token '${tokStream[i].lexeme}'.`, tokStream[i].filename, tokStream[i].lineNumber, tokStream[i].characterIndex);
            console.error(currentTok.lexeme);
        }
    }

    return AST;
}