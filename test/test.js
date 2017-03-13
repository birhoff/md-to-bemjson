'use strict';

const fs = require('fs');

const expect = require('chai').expect;
const nodeEval = require('node-eval');

const toBemjson = require('../index');
const md = fs.readFileSync(__dirname + '/test-assets/test.md');
const result = require('./test-assets/test.bemjson');

describe('test', () => {
    it('should convert md to bemjson', done => {
        toBemjson(md)
            .then(fileData => {
                const bjson = nodeEval(fileData);
                expect(bjson).to.deep.equal(result);
            })
            .catch(err => err)
            .then(done);
    });
});
