## Trifle Changelog
Here is a list of previous updates for Trifle.

## `v0.2.1`
`v0.2.1` allows math to be used with variables & allows variables to be set to mathematical expressions.

### Features
- Bug fixes

## `v0.2.0`
`v0.2.0` fixes the `v0.1.3` version's math and includes some minor performance fixes.

### Features
- Bug fixes
- Stable math
- Minor performance fixes

## `v0.1.3` (unstable)
`v0.1.3` implements a command line interface that you can run Trifle scripts with + the first official release to NPM.
To install:
```
npm i -g trifle
```
Example:
```
trifle <script>
```
You can run `trifle -h` for some help with the command.
### Features
- Command Line Interface
- Bug Fixes

## `v0.1.0` (unstable)
This version introduces basic math,  it's functional for basic math like `100 * 100 * 100 * 100` but when you do something like `(100 / 100) * 100` it outputs `1 100`.  This will be fixed in a future version.
```
$number = 100;
println($number * 100); //=> 10000
```
### Features
- Math

## `v0.0.1`
Basic programming language functionality, printing to the console, function calls, etc.
### Features
- Function calls. `function_name(...);`
- Variables
```
$variable = 100;
println($variable); //=> 100
```
- Arrays
### Methods (introduced in this version)
- `Array array(...$items)` - Creates an array with the items passed as arguments.
```
$my_array = array("Hello, world!");
println($my_array); //=> ["Hello, world!"]
```
- `Array array_values($array)` - Returns a list of only array values (including those from sub-arrays).
```
$my_array = array("Hello, world!", array("TEST"));
println(array_values($my_array)); //=> ["Hello, world!", "TEST"]
```
- `int array_length($array)` - Returns the length of an array.
```
$my_array = array("item 1", "item 2");
println(array_length($my_array)); // => 2
```
- `void println(...args)` - Prints all the arguments join together with a space.  For example, `println("hello,", "world")` will output `hello, world`.
```
println("Hello, world!");
```