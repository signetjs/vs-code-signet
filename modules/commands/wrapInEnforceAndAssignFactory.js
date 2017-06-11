'use strict';

function wrapInEnforceAndAssignFactory(wrapFactory) {

    return function (vsEditor, callback) {

        const templateHead = 'signet.enforce(';
        const setAssignment = true;

        return function wrapInEnforceAndAssign() {
            wrapFactory(vsEditor, callback)(templateHead, setAssignment);
        }

    }
}

module.exports = wrapInEnforceAndAssignFactory;