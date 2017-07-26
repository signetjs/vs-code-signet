'use strict';

function wrapInEnforceAndAssignFactory(wrapFactory, vsCodeFactory) {

    return function (_, callback) {
        const templateHead = 'signet.enforce(';
        const setAssignment = true;

        return function wrapInEnforceAndAssign() {
            const vscode = vsCodeFactory.get()
            const activeEditor = vscode.window.activeTextEditor;

            wrapFactory(activeEditor, callback)(templateHead, setAssignment);
        }

    }
}

module.exports = wrapInEnforceAndAssignFactory;