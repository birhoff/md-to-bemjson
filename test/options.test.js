'use strict';
const ExportType = require('remark-bemjson').ExportType;

const Converter = require('../index');

describe('Options', () => {
    it('should add github support with `github=true`', () => {
        const bjson = Converter.convertSync('@birhoff', { github: true });
        const link = bjson.content.content;

        expect(link).to.have.property('block', 'link');
        expect(link).to.have.property('content');
        expect(link).to.have.property('href', 'https://github.com/birhoff');
    });

    it('should not add github support with `github=false`', () => {
        const bjson = Converter.convertSync('@birhoff', { github: false });
        const content = bjson.content.content;

        expect(content).to.be.a('string');
    });

    it('should extract `exportType` option from constructor params', () => {
        const md2bemjson = (new Converter({ exportType: ExportType.MODULES }));
        const bjsonString = md2bemjson.stringifySync('hello');

        expect(bjsonString).to.startsWith('export default ');
    });

    it('should extract `exportName` option from constructor params', () => {
        const md2bemjson = (new Converter({ exportType: ExportType.MODULES, exportName: 'bemjson' }));
        const bjsonString = md2bemjson.stringifySync('hello');

        expect(bjsonString).to.startsWith('export default const bemjson = ');
    });

    it('should override `exportType` constructor option with `.stringifySync(text, { exportType })`', () => {
        const md2bemjson = (new Converter({ exportType: ExportType.NO_EXPORT }));
        const bjsonString = md2bemjson.stringifySync('hello', { exportType: ExportType.MODULES });

        expect(bjsonString).to.startsWith('export default ');
    });

    it('should override `exportName` constructor option with `.stringifySync(text, { exportName })`', () => {
        const md2bemjson = (new Converter({ exportType: ExportType.MODULES, exportName: 'noName' }));
        const bjsonString = md2bemjson.stringifySync('hello', { exportName: 'hasName' });

        expect(bjsonString).to.startsWith('export default const hasName = ');
    });

    describe('augment', () => {

        it('should accept augment as params', () => {
            const bjson = Converter.convertSync('# hello', { augment: {} });
            const heading = bjson.content;

            expect(heading).to.have.property('block', 'heading');
        });

        it('should accept augment as function', () => {
            const testAugment = bemNode => {
                bemNode.block = 'test-block';
                return bemNode;
            };
            const bjson = Converter.convertSync('# hello', { augment: testAugment });
            const heading = bjson.content;

            expect(heading).to.have.property('block', 'test-block');
        });

        describe('prefix', () => {
            it('should add prefix', () => {
                const bjson = Converter.convertSync('# hello', { augment: { prefix: 'my-' } });
                const heading = bjson.content;

                expect(heading).to.have.property('block', 'my-heading');
            });

            it('should not add prefix', () => {
                const bjson = Converter.convertSync('# hello', { augment: {} });
                const heading = bjson.content;

                expect(heading).to.have.property('block', 'heading');
            });

            it('should throw assert', () => {
                expect(() =>
                    Converter.convertSync('# hello', { augment: { prefix: {} } })
                ).to.throw('options.prefix must be string');
            });

            it('should replace prefix on `md-root`', () => {
                const bjson = Converter.convertSync('# hello', { augment: { prefix: 'my-' } });

                expect(bjson).to.have.property('block', 'my-root');
            });
        });

        describe('scope', () => {
            it('should replace root with scope', () => {
                const bjson = Converter.convertSync('# hello', { augment: { scope: 'my-root' } });

                expect(bjson).to.have.property('block', 'my-root');
            });

            it('should replace block with elem', () => {
                const bjson = Converter.convertSync('# hello', { augment: { scope: 'my-root' } });
                const heading = bjson.content;

                expect(heading).to.have.property('elem', 'heading');
                expect(heading).to.not.have.property('block');
            });

            it('should replace mods with elemMods', () => {
                const bjson = Converter.convertSync('# hello', { augment: { scope: 'my-root' } });
                const heading = bjson.content;

                expect(heading).to.have.property('elemMods');
                expect(heading).to.not.have.property('mods');
            });

            it('should throw assert', () => {
                expect(() =>
                    Converter.convertSync('# hello', { augment: { scope: {} } })
                ).to.throw('options.scope must be string');
            });
        });

        describe('combinations', () => {
            it('should replace prefixed blocks with elems', () => {
                const bjson = Converter.convertSync('# hello', { augment: { scope: 'scope', prefix: 'prefix-' } });
                const heading = bjson.content;

                expect(bjson).to.have.property('block', 'scope');
                expect(heading).to.have.property('elem', 'prefix-heading');
                expect(heading).to.not.have.property('block');
            });
        });
    });
});
