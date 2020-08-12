export class Regex {
    name: string;
    pattern: RegExp;

    /**
     * Creates a Regex object.
     * @param name The name of the Regex.
     * @param pattern The pattern to match.
     */
    constructor(name: string, pattern: RegExp) {
        this.name = name;
        this.pattern = pattern;
    }
}

export default Regex;