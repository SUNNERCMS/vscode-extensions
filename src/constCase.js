const vscode = require('vscode');
const {caseFormatHandle} = require("../utils/index");
const {formatConversionHandle} = require("../utils/formatConversionHandle");

module.exports = function(context) {
 	// 格式转换：(HELLO_WORD)
	const disposableTwo = vscode.commands.registerCommand(
		"formatConversion.constCase",
		formatConversionHandle(caseFormatHandle, 'constCase')
	);
    context.subscriptions.push(disposableTwo);
};