'use strict';

var esprima = require('esprima');
var estraverse = require('estraverse');

function scopeFinder() {
    function coordsFromVsCodeToEsprima(vsCodeCoords) {
        return {
            start: [vsCodeCoords.start[0] + 1, vsCodeCoords.start[1]],
            end: [vsCodeCoords.end[0] + 1, vsCodeCoords.end[1]],
        };
    }

    function coordsFromEsprimaToVsCode(esprimaCoords) {
        return {
            start: [esprimaCoords.start.line - 1, esprimaCoords.start.column],
            end: [esprimaCoords.end.line - 1, esprimaCoords.end.column]
        };
    }

    function convertCoordsToConsumable(coords) {
        return {
            start: {
                line: coords.start.line,
                column: coords.start.column
            },
            end: {
                line: coords.end.line,
                column: coords.end.column
            }
        }
    }

    function matchStartCoords(selectionStart, nodeStart) {
        return selectionStart[0] > nodeStart.line ||
            (selectionStart[0] === nodeStart.line &&
             selectionStart[1] >= nodeStart.column);
    }

    function matchEndCoords(selectionStart, nodeStart) {
        return selectionStart[0] > nodeStart.line ||
            (selectionStart[0] === nodeStart.line &&
             selectionStart[1] >= nodeStart.column);
    }

    function coordinateMatcher(coords) {
        return function (node) {
            return matchStartCoords(coords.start, node.loc.start) &&
                matchEndCoords(coords.end, node.loc.end);
        }
    }

    function findScopeCoords(source, inputCoords) {
        let ast = esprima.parse(source, { loc: true });
        let matchNode = coordinateMatcher(coordsFromVsCodeToEsprima(inputCoords));

        let matchedScope = null;
        let lastScope = null;

        estraverse.traverse(ast, {
            enter: function (node) {
                lastScope = /Function/.test(node.type) ? node : lastScope;
                matchedScope = matchNode(node) ? lastScope : matchedScope;
            },

            leave: function () { }
        });

        return coordsFromEsprimaToVsCode(convertCoordsToConsumable(matchedScope.loc));
    }

    return {
        findScopeCoords: findScopeCoords
    };
}

module.exports = scopeFinder;