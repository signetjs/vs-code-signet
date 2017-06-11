'use strict';

function wrapInSignAndAssignFactory(wrapFactory) {

    return function (vsEditor, callback) {

        const templateHead = 'signet.sign(';
        const setAssignment = true;

        return function wrapInSignAndAssign() {
            wrapFactory(vsEditor, callback)(templateHead, setAssignment);
        }

    }
}

module.exports = wrapInSignAndAssignFactory;