'use strict';

function wrapInSignFactory(wrapFactory) {

    return function (vsEditor, callback) {

        const templateHead = 'signet.sign(';

        return function wrapInEnforce() {
            wrapFactory(vsEditor, callback)(templateHead);
        }

    }
}

module.exports = wrapInSignFactory;