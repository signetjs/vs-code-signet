'use strict';

const signet = require('signet')();
const signetAssembler = require('signet-assembler');
const esprima = require('esprima');

function functionUtils() {

    const isObjectInstance = signet.isTypeOf('composite<not<null>, object>');

    function buildType(node) {
        let typeDef = {
            name: '',
            type: '*',
            optional: false
        };

        if (node.type === 'Identifier') {
            typeDef.name = node.name;
        } else {
            typeDef.name = node.left.name;
            typeDef.type = typeof node.right.value;
            typeDef.optional = true;
        }

        return signetAssembler.assembleType(typeDef);
    }

    function getParams(body) {
        return isObjectInstance(body.params) ? body.params : body.expression.params;
    }

    function getParsedFunction(fn) {
        let parseableStr = '(' + fn.toString() + ')()';
        return esprima.parse(parseableStr).body[0].expression.callee;
    }

    function getSignature(fn) {
        let body = getParsedFunction(fn);
        let params = getParams(body);

        const signatureParts = params.length === 0 ? ['*', '*'] : [params.map(buildType).join(', '), '*'];

        return signatureParts.join(' => ');
    }

    function getName(fn) {
        let body = getParsedFunction(fn);
        return typeof body.id === 'object' ? body.id.name : '';
    }

    return {
        getName: getName,
        getSignature: getSignature
    };

}

module.exports = functionUtils;