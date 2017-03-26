'use strict';

const Promise = require('bluebird');
const nodeEval = require('node-eval');

const processor = require('./processor');

/**
 * @typedef {Object} MDConverter~StringifyOptions
 * @property {ExportType} [exportType] - export type. Default: `commonJS`
 * @property {String} [exportName] - export name.
 */

class MDConverter {
    /**
     * @param {MDConverter~PluginOptions} [options] - converter options
     */
    constructor(options) {
        this._options = options;
        this._processor = processor.create(options);
        this._process = Promise.promisify(this._processor.process);
        this._processSync = this._processor.processSync;
    }

    /**
     * Converts markdown to bemjson
     *
     * @param {String} mdString - markdown text
     * @return {Promise.<Object>}
     */
    convert(mdString) {
        return this._process(mdString).then(vFile => nodeEval(vFile.toString()));
    }

    /**
     * Synchronous convert markdown string to bemjson
     * @param {String} mdString - markdown text
     * @returns {bemjson}
     */
    convertSync(mdString) {
        return nodeEval(this._processSync(mdString).toString());
    }

    /**
     * Stringify markdown string to bemjson
     *
     * @param {String} mdString - markdown text
     * @param {MDConverter~StringifyOptions} [options] - stringify options
     * @returns {Promise.<String>}
     */
    stringify(mdString, options) {
        const process = options ? this._createNewProcess(options) : this._process;

        return process(mdString).then(vFile => vFile.toString());
    }

    /**
     * Synchronous stringify markdown string to bemjson
     *
     * @param {String} mdString - markdown text
     * @param {MDConverter~StringifyOptions} [options] - stringify options
     * @returns {String}
     */
    stringifySync(mdString, options) {
        const processSync = options ? this._createNewProcessSync(options) : this._processSync;

        return processSync(mdString).toString();
    }

    _createNewProcess(options) {
        return Promise.promisify(processor.create(Object.assign({}, this._options, options)).process);
    }

    _createNewProcessSync(options) {
        return processor.create(Object.assign({}, this._options, options)).processSync;
    }

    /**
     * Converts markdown to bemjson
     *
     * @param {String} mdString - markdown text
     * @param {MDConverter~PluginOptions} [options] - converter options
     * @return {Promise.<bemjson>}
     */
    static convert(mdString, options) {
        return (new MDConverter(options)).convert(mdString);
    }

    /**
     * Synchronous convert markdown string to bemjson
     * @param {String} mdString - markdown text
     * @param {MDConverter~PluginOptions} [options] - converter options
     * @returns {bemjson}
     */
    static convertSync(mdString, options) {
        return (new MDConverter(options)).convertSync(mdString);
    }

    /**
     * Stringify markdown string to bemjson
     * @param {String} mdString - markdown text
     * @param {MDConverter~PluginOptions} [options] - converter options
     * @returns {Promise.<String>}
     */
    static stringify(mdString, options) {
        return (new MDConverter(options)).stringify(mdString);
    }

    /**
     * Synchronous stringify markdown string to bemjson
     *
     * @param {String} mdString - markdown text
     * @param {MDConverter~PluginOptions} [options] - converter options
     * @returns {String}
     */
    static stringifySync(mdString, options) {
        return (new MDConverter(options)).stringifySync(mdString);
    }
}

module.exports = MDConverter;
