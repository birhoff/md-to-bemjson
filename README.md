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
const toBemjson = require('md-2-bemjson');
const bemjson = toBemjson.convertSync('# Hello world');

console.log(JSON.parse(bemjson));
```

Yields: 
```json
{
    "block": "documentation",
    "content": {
        "block": "paragraph",
        "content": "#hello world"
    }
}
```

## API

### `toBemjson.convertSync(md[, options])`

##### `options`

* *Boolean* **github** — Enables github support with remark plugin [remark-github](https://github.com/wooorm/remark-github). Default — `true`.

License
-------

Code and documentation copyright 2017 YANDEX LLC. Code released under the [Mozilla Public License 2.0](LICENSE.txt).
