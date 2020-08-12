import { trifleError } from './trifleError';

export function errorTemplate(type: string) {
    return function(message: string, filename: string, lineNumber: number, char: number) {
        trifleError(type, message, filename, lineNumber, char);
    }
}
export default errorTemplate;