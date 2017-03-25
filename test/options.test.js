'use strict';

const expect = require('chai').expect;

const Converter = require('../index');

describe('Options', () => {
    it('should add github support with `github=true`', () => {
        const bjson = Converter.convertSync('@birhoff', { github: true });

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
    });

    it('should not add github support with `github=false`', () => {
        const bjson = Converter.convertSync('@birhoff', { github: false });

        expect(bjson).to.deep.equal({
            block: 'documentation',
            content: {
                block: 'paragraph',
                content: '@birhoff'
            }
        });
    });
});
