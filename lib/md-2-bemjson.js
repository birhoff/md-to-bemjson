'use strict';

const Promise = require('bluebird');

const remark = require('remark');
const lint = require('remark-lint');

const bemjson = require('remark-bemjson');

const remarkStream = remark().use(lint).use(bemjson);
const process = Promise.promisify(remarkStream.process);

/**
 * Converts markdown to bemjson
 *
 * @param {String} md - MD text
 * @return {Promise.<Object>}
 */
function md2bemjson(md) {
    return process(md).then(vFile => vFile.toString());
}

module.exports = md2bemjson;
