'use strict';

const expect = require('chai').expect;

const Converter = require('../index');

describe('API', () => {
    describe('static', () => {
        it('should `.convert` async', () => {
            const bjsonPromise = Converter.convert('#hello world');

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
            const bjson = Converter.convertSync('#hello world');

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
            const bjsonPromise = Converter.stringify('#hello world');

            expect(bjsonPromise.then).to.be.a('function');

            return expect(bjsonPromise).to.eventually.equal('module.exports = {\n  "block": "documentation",\n  "content": {\n    "block": "paragraph",\n    "content": "#hello world"\n  }\n}\n');
        });

        it('should `.stringifySync` sync', () => {
            const bjson = Converter.stringifySync('#hello world');

            expect(bjson.then).not.to.be.a('function');

            return expect(bjson).to.equal('module.exports = {\n  "block": "documentation",\n  "content": {\n    "block": "paragraph",\n    "content": "#hello world"\n  }\n}\n');
        });
    });

    describe('methods', () => {
        it('should `.convert` async', () => {
            const bjsonPromise = (new Converter()).convert('# Hello world');

            expect(bjsonPromise.then).to.be.a('function');

            return expect(bjsonPromise).to.eventually.deep.equal({
                block: 'documentation',
                content: {
                    block: 'heading',
                    content: 'Hello world',
                    mods: {
                        level: 1
                    }
                }
            });
        });

        it('should `.convertSync` sync', () => {
            const bjson = (new Converter()).convertSync('#hello world');

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
            const bjsonPromise = (new Converter()).stringify('#hello world');

            expect(bjsonPromise.then).to.be.a('function');

            return expect(bjsonPromise).to.eventually.equal('module.exports = {\n  "block": "documentation",\n  "content": {\n    "block": "paragraph",\n    "content": "#hello world"\n  }\n}\n');
        });

        it('should `.stringifySync` sync', () => {
            const bjson = (new Converter()).stringifySync('#hello world');

            expect(bjson.then).not.to.be.a('function');

            return expect(bjson).to.equal('module.exports = {\n  "block": "documentation",\n  "content": {\n    "block": "paragraph",\n    "content": "#hello world"\n  }\n}\n');
        });
    });
});
