<p align="center">
  <img width="512" height="512" src="assets/badge.png">
</p>

# Trifle Programming Language (v0.2.1 [Alpha])

## Installation
You can install using the `npm` command:
```sh
npm i -g triflelang
```

## Command Line Tool
Using the Trifle command line interface, you can easily run a Trifle script.  For example, you can run `./example.tri` with the `trifle` command:
```sh
trifle ./example.tri
```

## What is Trifle?
Trifle is a dynamically typed general purpose programming language written entirely in JavaScript.  It (with some hacking) works on both the web and in a Node.js environment.  It derives from Ruby, PHP and JavaScript. Here's an example:
```
$name = "John Doe";

println("Hello,", $name);
//=> Hello, John Doe
```

## Features
- (`0.0.1+`) `print` method.
- (`0.0.1+`) Basic array definition method (`array`) & array mutilation methods.
- (`0.0.1+`) Variable definitions. (and referencing)
- (`0.1.3+`) Trifle CLI.
- (`0.2.0+`) Math.

Check out the current features and how to use them at the [wiki page](https://github.com/zackenstien/trifle-lang/wiki).

## W.I.P. Features
- Accessing a specific index of an array.