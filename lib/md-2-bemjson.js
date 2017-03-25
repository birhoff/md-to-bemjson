'use strict';

const Promise = require('bluebird');
const nodeEval = require('node-eval');

const remark = require('remark');
const lint = require('remark-lint');
const github = require('remark-github');
const inlineLinks = require('remark-inline-links');
const bemjson = require('remark-bemjson');

const processor = remark().use(lint).use(github).use(inlineLinks).use(bemjson);
const process = Promise.promisify(processor.process);

/**
 * Converts markdown to bemjson
 *
 * @param {String} mdString - markdown text
 * @return {Promise.<bemjson>}
 */
module.exports.convert = function(mdString) {
    return process(mdString).then(vFile => nodeEval(vFile.toString()));
};

/**
 * Synchronous convert markdown string to bemjson
 * @param {String} mdString - markdown text
 * @returns {bemjson}
 */
module.exports.convertSync = function(mdString) {
    return nodeEval(processor.processSync(mdString).toString());
};

/**
 * Stringify markdown string to bemjson
 * @param {String} mdString - markdown text
 * @returns {Promise.<String>}
 */
module.exports.stringify = function(mdString) {
    return process(mdString).then(vFile => vFile.toString());
};

/**
 * Synchronous stringify markdown string to bemjson
 * @param {String} mdString - markdown text
 * @returns {String}
 */
module.exports.stringifySync = function(mdString) {
    return processor.processSync(mdString).toString();
};
