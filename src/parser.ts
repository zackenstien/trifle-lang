import { Token } from './Token';
import { lexer } from './lexer';

// Parser Helpers
import { list } from './parser/list';

// Trifle Error
import { syntaxError } from './error/stdErrors';

// AST Items
import { ASTItem } from './ast/ASTItem';
import { ASTFunctionCall } from './ast/ASTFunctionCall';
import { ASTVariableDefinition } from './ast/ASTVariableDefinition';

// Tools
import convert from './parser/convert';

export function parseAST(tokStream: Token[]): ASTItem[] {
    let AST: ASTItem[] = [];

    for (let i: number = 0; i < tokStream.length;) {
        let currentTok: Token = tokStream[i];

        if (currentTok.name == "iden") {
            if (tokStream[i + 1]) {
                if (tokStream[i + 1].lexeme == '=') {
                    if (tokStream[i + 2]) {
                        AST.push(new ASTVariableDefinition(currentTok.lexeme, tokStream[i + 2], currentTok.filename));
                        i += 3;

                        if (tokStream[i]) {
                            if (tokStream[i].lexeme == ';')
                                i++;
                        }
                    } else
                        syntaxError(`Unexpected token '=', expected value, got '<EOF>'.`, tokStream[i + 1].filename, tokStream[i + 1].lineNumber, tokStream[i + 1].characterIndex);
                } else {
                    let args = list('(', ')', i + 1, tokStream);
                    AST.push(new ASTFunctionCall(currentTok.lexeme, args.list, currentTok.filename));
                    i = args.i + 1;

                    if (tokStream[i]) {
                        if (tokStream[i].lexeme == ';')
                            i++;
                    }
                }
            } else
                syntaxError(`Expected '=', got '<EOF>'.`, tokStream[i].filename, tokStream[i].lineNumber, tokStream[i].characterIndex);
        } else
            syntaxError(`Unexpected token '${tokStream[i].lexeme}'.`, tokStream[i].filename, tokStream[i].lineNumber, tokStream[i].characterIndex);
    }

    return AST;
}

export function parse(ast: ASTItem[], env: object) {
    var vars: object = {};

    for (var i: number = 0; i < ast.length; i++) {
        let item = ast[i];

        if (item instanceof ASTFunctionCall) {
            if (env[item.name]) {
                let args = item.args.map(i => {
                    return convert(i, vars);
                })

                env[item.name].apply({}, args);
            }
        } else if (item instanceof ASTVariableDefinition) {
            vars[item.name] = item.value;
        }
    }
}