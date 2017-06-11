'use strict';

function wrapInEnforceFactory(wrapFactory) {

    return function (vsEditor, callback) {

        const templateHead = 'signet.enforce(';

        return function wrapInEnforce() {
            wrapFactory(vsEditor, callback)(templateHead);
        }

    }
}

module.exports = wrapInEnforceFactory;