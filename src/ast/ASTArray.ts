// AST Items
import { ASTItem } from './ASTItem';
import { Token } from '../Token';

export class ASTArray extends ASTItem {
    list: (Token|ASTItem)[];

    constructor(args: (Token|ASTItem)[], filename: string) {
        super(filename);

        this.list = args;
    }
}