const vscode = require('vscode');
const {paramCase} = require("../utils/index");
const {formatConversionHandle} = require("../utils/formatConversionHandle");

module.exports = function(context) {
 	// 格式转换：(helloWord)
	const disposableTwo = vscode.commands.registerCommand(
		"formatConversion.paramCase",
        formatConversionHandle(paramCase, 'paramCase')
	);
    context.subscriptions.push(disposableTwo);
};