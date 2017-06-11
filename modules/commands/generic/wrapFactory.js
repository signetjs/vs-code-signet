'use strict';

function wrapFactory(
    logger,
    scopeFinder,
    selectionFactory,
    utilities,
    editActionsFactory,
    functionUtils) {

    return function (vsEditor, callback) {

        const templateTail = ');';

        function getScopeCoords() {
            let selectionCoords = utilities.buildCoords(vsEditor, 0);
            let lines = utilities.getEditorDocument(vsEditor)._lines;
            return scopeFinder.findScopeCoords(lines.join('\n'), selectionCoords);
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

                if(assign) {
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

            function applyToDocument() {
                let text = result.join('\n') + templateTail;

                return editActionsFactory(vsEditor).applySetEdit(text, scopeCoords).then(callback);
            }

            if (selection === null) {
                logger.info('Unable to complete action: ' + errorMessage);
            } else {
                applyToDocument();
            }
        }

    }
}

module.exports = wrapFactory;