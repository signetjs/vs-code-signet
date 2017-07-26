'use strict';

function wrapInEnforceFactory(wrapFactory, vsCodeFactory) {

    return function (_, callback) {
        const templateHead = 'signet.enforce(';

        return function wrapInEnforce() {
            const vscode = vsCodeFactory.get()
            const activeEditor = vscode.window.activeTextEditor;

            wrapFactory(activeEditor, callback)(templateHead);
        }

    }
}

module.exports = wrapInEnforceFactory;