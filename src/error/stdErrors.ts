import { errorTemplate } from './errorTemplate';

export var stdErrors = {
    syntaxError: errorTemplate('SyntaxError')
};
export default stdErrors;
export var syntaxError = stdErrors.syntaxError;