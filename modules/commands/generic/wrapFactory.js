'use strict';

function wrapFactory(
    logger,
    scopeFinder,
    selectionFactory,
    utilities,
    editActionsFactory,
    functionUtils) {

    return function (vsEditor, callback) {


        function getScopeCoords() {
            let selectionCoords = utilities.buildCoords(vsEditor, 0);
            let lines = utilities.getEditorDocument(vsEditor)._lines;
            return scopeFinder.findFunctionCoords(lines.join('\n'), selectionCoords);
        }

        function applyToDocument(result, scopeCoords) {
            const text = result.join('\n');
            return editActionsFactory(vsEditor).applySetEdit(text, scopeCoords).then(callback);
        }


        return function signetWrap(templateHead, assign) {
            let scopeCoords;
            let selection;
            let errorMessage;
            let result = [templateHead];

            try {
                scopeCoords = getScopeCoords();
                selection = selectionFactory(vsEditor).getSelectionByCoords(scopeCoords);
                let functionSource = selection.join('\n');
                let functionName = functionUtils.getName(functionSource);
                let signature = functionUtils.getSignature(functionSource);

                if (assign) {
                    let varName = functionName === '' ? 'myFunction' : functionName;
                    let assignment = 'const ' + varName + ' = ';
                    result = [assignment + result[0]];
                }

                result.push("'" + signature + "',");
                result = result.concat(selection);

            } catch (e) {
                errorMessage = e.message;
                selection = null;
            }

            const templateTail = ');';
            result.push(templateTail);

            if (selection === null) {
                logger.info('Unable to complete action: ' + errorMessage);
            } else {
                applyToDocument(result, scopeCoords);
            }
        }

    }
}

module.exports = wrapFactory;