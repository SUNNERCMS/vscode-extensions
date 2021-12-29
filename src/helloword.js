const vscode = require('vscode');
module.exports = function(context) {
    // Hello Word示例
	// 命令事件进行注册
	const disposableOne = vscode.commands.registerCommand('vscode-extension-demo.helloWorld', () => {
		// 命令执行时触发
		const showMessage = `vscode插件实现示例：Hello World Demo from vscode-extension-demo!!`
		vscode.window.showInformationMessage(showMessage);
	});
    context.subscriptions.push(disposableOne);
};