'use strict';

const defaultsDeep = require('lodash.defaultsdeep');

const remark = require('remark');
const lint = require('remark-lint');
const github = require('remark-github');
const inlineLinks = require('remark-inline-links');
const bemjson = require('remark-bemjson');

const defaults = require('./defaults');

/**
 * @typedef {Object} MDConverter~PluginOptions
 * @property {Boolean} github - enable github integrations
 */

/**
 *
 * @param {MDConverter~PluginOptions} options - converter options
 * @returns {this}
 */
function createProcessor(options) {
    const settings = defaultsDeep({}, options, defaults);
    const processor = remark().use(lint).use(inlineLinks);

    if (settings.github) {
        processor.use(github);
    }

    return processor.use(bemjson).freeze();
}

module.exports.create = createProcessor;
