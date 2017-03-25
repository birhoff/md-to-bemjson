'use strict';

const expect = require('chai').expect;
const toBemjson = require('../index');

describe('API', () => {
    it('should `.convert` async', () => {
        const bjsonPromise = toBemjson.convert('#hello world');

        expect(bjsonPromise.then).to.be.a('function');

        return expect(bjsonPromise).to.eventually.deep.equal({
            block: 'documentation',
            content: {
                block: 'paragraph',
                content: '#hello world'
            }
        });
    });

    it('should `.convertSync` sync', () => {
        const bjson = toBemjson.convertSync('#hello world');

        expect(bjson.then).not.to.be.a('function');

        return expect(bjson).to.deep.equal({
            block: 'documentation',
            content: {
                block: 'paragraph',
                content: '#hello world'
            }
        });
    });

    it('should `.stringify` async', () => {
        const bjsonPromise = toBemjson.stringify('#hello world');

        expect(bjsonPromise.then).to.be.a('function');

        return expect(bjsonPromise).to.eventually.equal('module.exports = {\n  "block": "documentation",\n  "content": {\n    "block": "paragraph",\n    "content": "#hello world"\n  }\n}\n');
    });

    it('should `.stringifySync` sync', () => {
        const bjson = toBemjson.stringifySync('#hello world');

        expect(bjson.then).not.to.be.a('function');

        return expect(bjson).to.equal('module.exports = {\n  "block": "documentation",\n  "content": {\n    "block": "paragraph",\n    "content": "#hello world"\n  }\n}\n');
    });
});
