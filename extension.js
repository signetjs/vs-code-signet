'use strict';

var container = require('./container');

function activate(context) {
    var vscode = container.build('vsCodeFactory').get();

    var formatDocument = vscode.commands.executeCommand.bind(vscode.commands, "editor.action.formatDocument");

    let wrapInEnforce = container.build('wrapInEnforceFactory');
    context.subscriptions.push(vscode.commands.registerCommand(
        'cmstead.signet.wrapInEnforce',
        wrapInEnforce(vscode.window.activeTextEditor, formatDocument)
    ));

    let wrapInEnforceAndAssign = container.build('wrapInEnforceAndAssignFactory');
    context.subscriptions.push(vscode.commands.registerCommand(
        'cmstead.signet.wrapInEnforceAndAssign',
        wrapInEnforceAndAssign(vscode.window.activeTextEditor, formatDocument)
    ));

    let wrapInSign = container.build('wrapInSignFactory');
    context.subscriptions.push(vscode.commands.registerCommand(
        'cmstead.signet.wrapInSign',
        wrapInSign(vscode.window.activeTextEditor, formatDocument)
    ));

    let wrapInSignAndAssign = container.build('wrapInSignAndAssignFactory');
    context.subscriptions.push(vscode.commands.registerCommand(
        'cmstead.signet.wrapInSignAndAssign',
        wrapInSignAndAssign(vscode.window.activeTextEditor, formatDocument)
    ));

}


function deactivate() { /* noop */ }

exports.activate = activate;
exports.deactivate = deactivate;