'use strict';

const defaultsDeep = require('lodash.defaultsdeep');

const remark = require('remark');
const github = require('remark-github');
const inlineLinks = require('remark-inline-links');
const bemjson = require('remark-bemjson');

const defaults = require('./defaults');

/**
 * @typedef {Object} MDConverter~PluginOptions
 * @property {Boolean} [github=true] - enable github integrations
 */

/**
 *
 * @param {MDConverter~PluginOptions} options - converter options
 * @returns {this}
 */
function createProcessor(options) {
    /** @type MDConverter~PluginOptions */
    const settings = defaultsDeep({}, options, defaults);
    const processor = remark().use(inlineLinks);

    if (settings.github) {
        processor.use(github);
    }

    return processor.use(bemjson).freeze();
}

module.exports.create = createProcessor;
