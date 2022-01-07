const vscode = require('vscode');
const {caseFormatHandle} = require("../utils/index");
const {formatConversionHandle} = require("../utils/formatConversionHandle");

module.exports = function(context) {
 	// 格式转换：(helloWord)
	const disposableTwo = vscode.commands.registerCommand(
		"formatConversion.paramCase",
        formatConversionHandle(caseFormatHandle, 'paramCase')
	);
    context.subscriptions.push(disposableTwo);
};