import { errorTemplate } from './errorTemplate';

export var stdErrors = {
    syntaxError: errorTemplate('SyntaxError'),
    referenceError: errorTemplate('ReferenceError')
};
export default stdErrors;

export var syntaxError = stdErrors.syntaxError;
export var referenceError = stdErrors.referenceError;