'use strict';

var j = require('jfp');

function selectionFactory(
    utilities,
    textSelectorFactory) {

    return function (vsEditor) {
        var contentList = utilities.getEditorDocument(vsEditor)._lines;
        var selections = vsEditor._selections;

        function getSelectionLine(index) {
            return contentList[selections[index]._start._line];
        }

        function getSelection(index) {
            return textSelectorFactory(selections[index])(contentList, selections[index]);
        }

        function coordsToSelection (coords) {
            return {
                _start: {
                    _line: coords.start[0],
                    _character: coords.start[1]
                },
                _end: {
                    _line: coords.end[0],
                    _character: coords.end[1]
                }
            };
        }

        function getSelectionByCoords(coords) {
            let selection = coordsToSelection(coords);
            return textSelectorFactory(selection)(contentList, selection);
        }

        return {
            getSelectionLine: getSelectionLine,
            getSelection: getSelection,
            getSelectionByCoords: getSelectionByCoords
        };
    }

}

module.exports = selectionFactory;