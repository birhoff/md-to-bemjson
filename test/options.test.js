'use strict';
const ExportType = require('remark-bemjson').ExportType;

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
});
