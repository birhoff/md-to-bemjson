'use strict';

const fs = require('fs');

const expect = require('chai').expect;

const toBemjson = require('../index');
const md = fs.readFileSync(__dirname + '/test-assets/test.md');

describe('test', () => {
    it('should convert md to bemjson', () => {
        const bjson = toBemjson.convertSync(md);
        expect(bjson).to.deep.equal(require('./test-assets/test.bemjson'));
    });
});
