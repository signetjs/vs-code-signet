'use strict';

var container = require('./container');

function activate(context) {
    var vscode = container.build('vsCodeFactory').get();

    var formatDocument = vscode.commands.executeCommand.bind(vscode.commands, "editor.action.formatDocument");

    let wrapInEnforce = container.build('wrapInEnforceFactory');
    context.subscriptions.push(vscode.commands.registerCommand(
        'cmstead.signet.wrapInEnforce',
        wrapInEnforce(null, formatDocument)
    ));

    let wrapInEnforceAndAssign = container.build('wrapInEnforceAndAssignFactory');
    context.subscriptions.push(vscode.commands.registerCommand(
        'cmstead.signet.wrapInEnforceAndAssign',
        wrapInEnforceAndAssign(null, formatDocument)
    ));

    let wrapInSign = container.build('wrapInSignFactory');
    context.subscriptions.push(vscode.commands.registerCommand(
        'cmstead.signet.wrapInSign',
        wrapInSign(null, formatDocument)
    ));

    let wrapInSignAndAssign = container.build('wrapInSignAndAssignFactory');
    context.subscriptions.push(vscode.commands.registerCommand(
        'cmstead.signet.wrapInSignAndAssign',
        wrapInSignAndAssign(null, formatDocument)
    ));

}


function deactivate() { /* noop */ }

exports.activate = activate;
exports.deactivate = deactivate;