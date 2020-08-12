export class Token {
    name: string;
    lexeme: string;
    filename: string;
    lineNumber: number;
    characterIndex: number;

    /**
     * Creates a Token object.
     * @param name The name/type of the token.
     * @param lexeme The token that was found.
     * @param lineNumber The line that the token was found on.
     * @param characterIndex The index of the first character in `lexeme`.
     * @param filename The name of the file this token is from.
     */
    constructor(name: string, lexeme: string, lineNumber: number, characterIndex: number, filename: string) {
        this.name = name;
        this.lexeme = lexeme;
        this.filename = filename;
        this.lineNumber = lineNumber;
        this.characterIndex = characterIndex;
    }
}

export default Token;