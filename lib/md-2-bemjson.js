'use strict';

const Promise = require('bluebird');
const nodeEval = require('node-eval');

const processor = require('./processor');

class MDConverter {
    /**
     * @param {MDConverter~PluginOptions} [options] - converter options
     */
    constructor(options) {
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
     * @returns {Promise.<String>}
     */
    stringify(mdString) {
        return this._process(mdString).then(vFile => vFile.toString());
    }

    /**
     * Synchronous stringify markdown string to bemjson
     *
     * @param {String} mdString - markdown text
     * @returns {String}
     */
    stringifySync(mdString) {
        return this._processSync(mdString).toString();
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
