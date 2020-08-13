// AST Items
import { ASTItem } from './ASTItem';
import { Token } from '../Token';

export class ASTVariableDefinition extends ASTItem {
    name: string;
    value: Token|ASTItem;

    constructor(name: string, value: Token|ASTItem, filename: string) {
        super(filename);

        this.name = name;
        this.value = value;
    }
}