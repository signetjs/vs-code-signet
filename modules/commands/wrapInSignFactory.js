'use strict';

function wrapInSignFactory(wrapFactory, vsCodeFactory) {

    return function (_, callback) {
        const templateHead = 'signet.sign(';

        return function wrapInEnforce() {
            const vscode = vsCodeFactory.get()
            const activeEditor = vscode.window.activeTextEditor;

            wrapFactory(activeEditor, callback)(templateHead);
        }

    }
}

module.exports = wrapInSignFactory;