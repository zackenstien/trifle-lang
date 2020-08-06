module.exports = class Token {
    name; lexeme;

    constructor(name, lexeme) {
        this.name = name;
        this.lexeme = lexeme;
    }
}