'use strict';

/**
 * create augment function with options
 *
 * @param {MDConverter~AugmentOptions} options - augmentation options
 * @returns {Function}
 */
function augmentFactory(options) {
    options || (options = {});

    /**
     * Apply custom augmentation
     *
     * @param {Object} bemNode - representation of bem entity
     * @returns {Object} bemNode
     */
    function augment(bemNode) {

        if (options.prefix) {
            bemNode = augmentPrefix(bemNode, options.prefix);
        }

        return bemNode;
    }

    return augment;
}

/**
 * Add prefix to all block names
 * *Important*: in root block prefix `md-` will be replaced.
 *
 * @param {Object} bemNode - representation of bem entity
 * @param {string} prefix - new prefix
 * @returns {Object} bemNode
 */
function augmentPrefix(bemNode, prefix) {

    // `md-` is already prefix, replace it
    if (bemNode.block === 'md-root') {
        bemNode.block = bemNode.block.replace('md-', prefix);
    } else {
        // in other cases just add prefix
        bemNode.block = `${prefix}${bemNode.block}`;
    }

    return bemNode;
}

module.exports = augmentFactory;
