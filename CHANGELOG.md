## Trifle Changelog
Here is a list of previous updates for Trifle.

## `v0.1.0` (unstable)
This version introduces basic math,  it's functional for basic math like `100 * 100 * 100 * 100` but when you do something like `(100 / 100) * 100` it outputs `1 100`.  This will be fixed in a future version.

```
$number = 100;
println($number * 100); //=> 10000
```

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