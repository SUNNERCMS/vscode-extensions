const vscode = require('vscode');
const {constCase} = require("../utils/index");
const {formatConversionHandle} = require("../utils/formatConversionHandle");


module.exports = function(context) {
 	// 格式转换：(HELLO_WORD)
	const disposableTwo = vscode.commands.registerCommand(
		"formatConversion.constCase",
		formatConversionHandle(constCase, 'constCase')
	);
    context.subscriptions.push(disposableTwo);
};