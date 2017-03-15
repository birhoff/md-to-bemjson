# md-2-bemjson
Converts `.md` files to `.bemjson.js` files.

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
const unified = require('unified');
const markdown = require('remark-parse');
const toBemjson = require('md-2-bemjson');

const mdast = unified().use(markdown).parse('# Hello im _heading_');
const bjson = toBemjson(mdast);

console.log(JSON.stringify(bjson));

// {
//   "block": "documentation",
//   "content": {
//     "block": "heading",
//     "mods": {
//       "level": 1
//     },
//     "content": [
//       "Hello im ",
//       {
//         "block": "emphasis",
//         "content": "heading"
//       }
//     ]
//   }
// }
```

## API

You can specify options with second arg.
```javascript
const toBemjson = require('md-2-bemjson');

toBemjson({/* ...tree */}, {/* options */});
```

### Plugin options

* *String|Object* **root** — Define block wrapper. Default — `documentation`.
* *Boolean* **scope** — Define how to render nodes as blocks or elements. If `true` render as elements of `root` block. Default — `false`.
* *Boolean* **tag** — Define render html tags to block. Default — `false`.


License
-------

Code and documentation copyright 2017 YANDEX LLC. Code released under the [Mozilla Public License 2.0](LICENSE.txt).
