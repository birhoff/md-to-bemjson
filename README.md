# md-2-bemjson
Converts `markdown` text to [`bemjson`][bemjson].

[![NPM Status][npm-img]][npm]
[![Travis Status][test-img]][travis]
[![Coverage Status][coverage-img]][coveralls]
[![Dependency Status][dependency-img]][david]
[![Greenkeeper badge][greenkeeper-img]][greenkeeper]

[npm]:            https://www.npmjs.org/package/md-2-bemjson
[npm-img]:        https://img.shields.io/npm/v/md-2-bemjson.svg

[travis]:         https://travis-ci.org/birhoff/md-2-bemjson
[test-img]:       https://img.shields.io/travis/birhoff/md-2-bemjson.svg?label=tests

[coveralls]:      https://coveralls.io/r/birhoff/md-2-bemjson
[coverage-img]:   https://img.shields.io/coveralls/birhoff/md-2-bemjson.svg

[david]:          https://david-dm.org/birhoff/md-2-bemjson
[dependency-img]: http://img.shields.io/david/birhoff/md-2-bemjson.svg

[greenkeeper]:    https://greenkeeper.io/
[greenkeeper-img]:https://badges.greenkeeper.io/birhoff/md-2-bemjson.svg

## Requirements

* [Node.js 4+](https://nodejs.org/en/)

## Install

```sh
$ npm install md-2-bemjson
```

## Usage

```js
const toBemjson = require('md-2-bemjson').convertSync;
const bjson = toBemjson('# Hello world');

console.log(JSON.stringify(bjson, null, 4));
```
Yields: 
```json
{
    "block": "documentation",
    "content": {
        "block": "heading",
        "content": "Hello world",
        "mods": {
            "level": 1
        }
    }
}
```

Markdown converter to [bemjson][bemjson]
-----------------------------

Module use [remark](https://github.com/wooorm/remark) with several plugins and custom compiler to convert markdown to bemjson.
Plugins divided into two groups: necessary(you can't disable this plugins) and optional.

### Necessary plugins: 
* [remark-inline-links](https://github.com/wooorm/remark-inline-links) - [bemjson][bemjson] don't support references.

### Optional plugins:
* [remark-github](https://github.com/wooorm/remark-github) - Github integrations (issues, commits, mentions)

### Compiler
* [remark-bemjson](https://github.com/birhoff/remark-bemjson) - custom [bemjson][bemjson] compiler


API
---

* [constructor(\[options\])](#constructoroptions)
* [convert(markdown)](#convertmarkdown--promise)
* [convertSync(markdown)](#convertsyncmarkdown--bemjson)
* [stringify(markdown)](#stringifymarkdown--promise)
* [stringifySync(markdown)](#stringifysyncmarkdown--string)
* [_static_ convert(markdown\[, options\])](#static-convertmarkdown--options--promise)
* [_static_ convertSync(markdown\[, options\])](#static-convertsyncmarkdown--options--bemjson)
* [_static_ stringify(markdown\[, options\])](#static-stringifymarkdown--options--promise)
* [_static_ stringifySync(markdown\[, options\])](#static-stringifysyncmarkdown--options--string)

### constructor(\[options\])

#### Options
Parameter | Type      | Description
----------|-----------|------------------------------
`github`  | `boolean` | Enables github support with remark plugin [remark-github](https://github.com/wooorm/remark-github). Default — `true`.
 

### convert(markdown) => Promise<Bemjson>
 
Parameter | Type      | Description
----------|-----------|------------------------------
`markdown`| `string`  | Markdown text

Asynchronously converts markdown to [bemjson][bemjson].

```js
const Converter = require('md-2-bemjson');
const md2Bemjson = new Converter();
 
md2Bemjson.convert('# Hello world').then(bjson => console.log(JSON.stringify(bjson, null, 4)))
```
Yields:
```json
{
    "block": "documentation",
    "content": {
        "block": "heading",
        "content": "Hello world",
        "mods": {
            "level": 1
        }
    }
}
```

### convertSync(markdown) => Bemjson
 
Parameter | Type      | Description
----------|-----------|------------------------------
`markdown`| `string`  | Markdown text

Synchronously converts markdown to [bemjson][bemjson].

```js
const Converter = require('md-2-bemjson');
const md2Bemjson = new Converter();
 
console.log(JSON.stringify(md2Bemjson.convertSync('# Hello world'), null, 4)); 
```
Yields:
```json
{
    "block": "documentation",
    "content": {
        "block": "heading",
        "content": "Hello world",
        "mods": {
            "level": 1
        }
    }
}
```

### stringify(markdown) => Promise<String>
 
Parameter | Type      | Description
----------|-----------|------------------------------
`markdown`| `string`  | Markdown text

Asynchronously converts and stringify markdown to [bemjson][bemjson] module with exports.

```js
const Converter = require('md-2-bemjson');
const md2Bemjson = new Converter();
 
md2Bemjson.stringify('# Hello world').then(content => console.log(content))
```
Yields:
```js
module.exports = {
    block: 'documentation',
    content: {
        block: 'heading',
        content: 'Hello world',
        mods: {
            'level': 1
        }
    }
};
```

### stringifySync(markdown) => String
 
Parameter | Type      | Description
----------|-----------|------------------------------
`markdown`| `string`  | Markdown text

Synchronously converts and stringify markdown to [bemjson][bemjson] module with exports.

```js
const Converter = require('md-2-bemjson');
const md2Bemjson = new Converter();
 
console.log(md2Bemjson.stringifySync('# Hello world'));
 ```
Yields:
```js
module.exports = {
    block: 'documentation',
    content: {
        block: 'heading',
        content: 'Hello world',
        mods: {
            'level': 1
        }
    }
};
```

### _static_ convert(markdown \[, options\]) => Promise<Bemjson>
 
Parameter | Type      | Description
----------|-----------|------------------------------
`markdown`| `string`  | Markdown text
`options` | `object`  | [plugin options](#options)

Asynchronously converts markdown to [bemjson][bemjson].

```js
const toBemjson = require('md-2-bemjson').convert;
 
toBemjson('# Hello world').then(bjson => console.log(JSON.stringify(bjson, null, 4)))
```
Yields:
 ```json
{
    "block": "documentation",
    "content": {
        "block": "heading",
        "content": "Hello world",
        "mods": {
            "level": 1
        }
    }
}
```

### _static_ convertSync(markdown \[, options\]) => Bemjson
 
Parameter | Type      | Description
----------|-----------|------------------------------
`markdown`| `string`  | Markdown text
`options` | `object`  | [plugin options](#options)

Synchronously converts markdown to [bemjson][bemjson].

```js
const toBemjson = require('md-2-bemjson').convertSync;
 
console.log(JSON.stringify(toBemjson('# Hello world'), null, 4));
```
Yields:
```json
{
    "block": "documentation",
    "content": {
        "block": "heading",
        "content": "Hello world",
        "mods": {
            "level": 1
        }
    }
}
```

### _static_ stringify(markdown \[, options\]) => Promise<String>
 
Parameter | Type      | Description
----------|-----------|------------------------------
`markdown`| `string`  | Markdown text
`options` | `object`  | [plugin options](#options)

Asynchronously converts and stringify markdown to [bemjson][bemjson] module with exports.

```js
const toBemjsonString = require('md-2-bemjson').stringify;

toBemjsonString('# Hello world').then(bjson => console.log(JSON.stringify(bjson, null, 4)));
```
Yields:
```js
module.exports = {
    block: 'documentation',
    content: {
        block: 'heading',
        content: 'Hello world',
        mods: {
            'level': 1
        }
    }
};
```

### _static_ stringifySync(markdown \[, options\]) => String
 
Parameter | Type      | Description
----------|-----------|------------------------------
`markdown`| `string`  | Markdown text
`options` | `object`  | [plugin options](#options)

Synchronously converts and stringify markdown to [bemjson][bemjson] module with exports.

```js
const toBemjsonString = require('md-2-bemjson').stringifySync;

console.log(toBemjsonString('# Hello world'));
```
Yields:
```js
module.exports = {
    block: 'documentation',
    content: {
        block: 'heading',
        content: 'Hello world',
        mods: {
            'level': 1
        }
    }
};
```

License
-------

Code and documentation copyright 2017 YANDEX LLC. Code released under the [Mozilla Public License 2.0](LICENSE.txt).


[bemjson]: https://en.bem.info/platform/bemjson/
