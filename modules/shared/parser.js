var babylon = require('babylon');

const babylonPlugins = [
    'estree',
    'jsx',
    'flow',
    'doExpressions',
    'objectRestSpread',
    'decorators',
    'classProperties',
    'exportExtensions',
    'asyncGenerators',
    'functionBind',
    'functionSent',
    'dynamicImport',
    'templateInvalidEscapes'
];

function getAst(source) {
    try {
        return babylon.parse(source, { sourceType: 'script', plugins: babylonPlugins });
    } catch (e) {
        return babylon.parse(source, { sourceType: 'module', plugins: babylonPlugins });
    }
}

module.exports = {
    getAst: getAst
};