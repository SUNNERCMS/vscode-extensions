const vscode = require('vscode');
const {caseFormatHandle} = require("../utils/index");
const {formatConversionHandle} = require("../utils/formatConversionHandle");

module.exports = function(context) {
 	// 格式转换：(hello_word)
	const disposableTwo = vscode.commands.registerCommand(
		"formatConversion.snakeCase",
        formatConversionHandle(caseFormatHandle, 'snakeCase')
	);
    context.subscriptions.push(disposableTwo);
};