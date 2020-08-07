---
id: installing
title: Installing
sidebar_label: Installing
---

Installing Trifle is really simple and only requires Node.js.

## Prerequisites
- [Node.js](https://nodejs.org/en/) Minimum: `v4.x+` Recommended: `v14.x.x`
- [NPM](https://www.npmjs.com/) (Comes bundled with Node.js)

## Getting Ready
*If you've already installed Node.js and NPM, you can skip this step.*
First of all, we need to check if Node.js is installed correctly.  To do so, run the following command in your terminal of choice:
```sh
npm -v
```
If it says something like `1.23.4`, great!  You've installed Node.js correctly.

## Installing Trifle
If you want to use Yarn, you can install Trifle with yarn with the following commands:
```sh
npm install -g yarn
yarn add triflelang
```
Or you can install it with vanilla NPM:
```sh
npm install -g triflelang
```
To test the installation, type 
```sh
trifle -v
```
If it says something similar to `v0.1.5`, congratulations!  You've set up Trifle!  Now you can use the Trifle CLI to run your Trifle scripts.