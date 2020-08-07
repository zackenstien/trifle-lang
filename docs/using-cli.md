---
id: using-cli
title: Using the Trifle CLI
sidebar_label: Trifle CLI
---

If you have Trifle installed, you can use the Trifle command line tool to run your scripts.

## Hello, World
Let's get started by making a new Trifle script named `helloworld.tri` and write this in it:
```php
println("Hello, world!");
```
Now if you run the Trifle command on the `helloworld.tri` script like so:
```
trifle ./helloworld
```
It should output `Hello, world!`.  If you are following along and it doesn't output `Hello, world!`, make sure there are no typos in your script.  Feel free to copy and paste the code from above.  If it still doesn't work, try updating to a later version:
```sh
npm update -g triflelang
```