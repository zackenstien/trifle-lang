// AST Items
import { ASTItem } from './ASTItem';
import { Token } from '../Token';

export class ASTVariableDefinition extends ASTItem {
    name: string;
    value: Token;

    constructor(name: string, value: Token, filename: string) {
        super(filename);

        this.name = name;
        this.value = value;
    }
}