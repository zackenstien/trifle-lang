import { Token } from "../Token";
import { syntaxError, referenceError } from "../error/stdErrors";

export function convert(item: Token, vars: object) {
    if (item.name == 'string') {
        if (item.lexeme[0] == '\'')
            return item.lexeme.slice(1, -1).replace('\\\'', '\'').replace('\\n', '\n');
        else if (item.lexeme[0] == '"')
            return item.lexeme.slice(1, -1).replace('\\"', '"').replace('\\n', '\n');
    } else if (item.name == 'int')
        return parseInt(item.lexeme);
    else if (item.name == 'float')
        return parseFloat(item.lexeme);
    else if (item.name == 'iden') {
        if (item.lexeme == 'true')
            return true;
        else if (item.lexeme == 'false')
            return false;
        else if (item.lexeme == 'null')
            return null

        if (vars[item.lexeme]) {
            return convert(vars[item.lexeme], vars);
        } else
            referenceError(`Variable '${item.lexeme}' doesn't exist.  Is it a typo?`, item.filename, item.lineNumber, item.characterIndex)
    } else
        syntaxError(`Unexpected token '${item.lexeme}'.`, item.filename, item.lineNumber, item.characterIndex)
}
export default convert;