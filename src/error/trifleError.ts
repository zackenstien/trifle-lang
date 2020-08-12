import * as colors from 'colors';

export function trifleError(name: string, message: string, filename: string, lineNumber: number, char: number) {
    console.log(colors.red(`${name}: ${message}`));
    console.log(`${''.padEnd(name.length)}in ${filename} @ ${lineNumber}:${char}.`);
    console.log(`\nIf you believe this is a ${colors.red('bug')}, please report it to the developers ASAP!`);
     
    process.exit(1);
}
export default trifleError;