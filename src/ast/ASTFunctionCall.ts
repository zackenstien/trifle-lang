// AST Items
import { ASTItem } from './ASTItem';
import { Token } from '../Token';

export class ASTFunctionCall extends ASTItem {
    name: string;
    args: Token[];

    constructor(name: string, args: Token[], filename: string) {
        super();

        this.name = name;
        this.args = args;
        this.filename = filename;
    }
}