const vscode = require('vscode');
const {humpNaming} = require("../utils/index");
const {formatConversionHandle} = require("../utils/formatConversionHandle");

module.exports = function(context) {
 	// 格式转换：(helloWord)
	const disposableTwo = vscode.commands.registerCommand(
		"formatConversion.camelCase",
        formatConversionHandle(humpNaming, 'camelCase')
	);
    context.subscriptions.push(disposableTwo);
};