'use strict';

function editFactory(vsCodeFactory) {

    var vscode;

    function positionFactory(location) {
        return new vscode.Position(location[0], location[1]);
    }

    function rangeFactory(start, end) {
        var startPosition = positionFactory(start);
        var endPosition = positionFactory(end);

        return new vscode.Range(startPosition, endPosition);
    }

    function textEditFactory(coords, content) {
        var range = rangeFactory(coords.start, coords.end);
        return new vscode.TextEdit(range, content);
    }

    function workspaceEditFactory() {
        return new vscode.WorkspaceEdit();
    }

    function setEditFactory(uri, edits) {
        var edit = workspaceEditFactory();

        edit.set(uri, edits);

        return edit;
    }

    // Composite construction functions

    function initializeVsCode (){
        vscode = vsCodeFactory.get();
    }

    function buildSetEdit(uri, coords, text) {
        initializeVsCode();

        var textEdit = textEditFactory(coords, text);
        return setEditFactory(uri, [textEdit]);
    }

    return {
        buildSetEdit: buildSetEdit
    };
}

module.exports = editFactory;