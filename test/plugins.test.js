'use strict';

const expect = require('chai').expect;
const nodeEval = require('node-eval');

const toBemjson = require('../index');

describe('Plugins', () => {
    it('should extract @mention from github', done => {
        toBemjson('@birhoff')
            .then(fileData => {
                const bjson = nodeEval(fileData);
                expect(bjson).to.deep.equal({
                    block: 'documentation',
                    content: {
                        block: 'paragraph',
                        content: {
                            block: 'link',
                            content: {
                                block: 'strong',
                                content: '@birhoff'
                            },
                            href: 'https://github.com/birhoff'
                        }
                    }
                });
            })
            .catch(err => err)
            .then(done);
    });

    it('should convert definitions to inline', done => {
        toBemjson([
            '[foo], [foo][], [bar][foo].',
            '',
            '![foo], ![foo][], ![bar][foo].',
            '',
            '[foo]: http://example.com "Example Domain"',
            ''
        ].join('\n'))
            .then(fileData => {
                const bjson = nodeEval(fileData);
                expect(bjson).to.deep.equal({
                    block: 'documentation',
                    content: [
                        {
                            block: 'paragraph',
                            content: [
                                {
                                    block: 'link',
                                    content: 'foo',
                                    href: 'http://example.com',
                                    title: 'Example Domain'
                                },
                                ', ',
                                {
                                    block: 'link',
                                    content: 'foo',
                                    href: 'http://example.com',
                                    title: 'Example Domain'
                                },
                                ', ',
                                {
                                    block: 'link',
                                    content: 'bar',
                                    href: 'http://example.com',
                                    title: 'Example Domain'
                                },
                                '.'
                            ]
                        },
                        {
                            block: 'paragraph',
                            content: [
                                {
                                    alt: 'foo',
                                    block: 'image',
                                    title: 'Example Domain',
                                    url: 'http://example.com'
                                },
                                ', ',
                                {
                                    alt: 'foo',
                                    block: 'image',
                                    title: 'Example Domain',
                                    url: 'http://example.com'
                                },
                                ', ',
                                {
                                    alt: 'bar',
                                    block: 'image',
                                    title: 'Example Domain',
                                    url: 'http://example.com'
                                },
                                '.'
                            ]
                        }
                    ]
                });
            })
            .catch(err => err)
            .then(done);
    });
});
