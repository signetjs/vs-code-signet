'use strict';

function wrapInSignAndAssignFactory(wrapFactory, vsCodeFactory) {

    return function (_, callback) {
        const templateHead = 'signet.sign(';
        const setAssignment = true;

        return function wrapInSignAndAssign() {
            const vscode = vsCodeFactory.get()
            const activeEditor = vscode.window.activeTextEditor;

            wrapFactory(activeEditor, callback)(templateHead, setAssignment);
        }

    }
}

module.exports = wrapInSignAndAssignFactory;