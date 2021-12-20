const vscode = require('vscode');
const {toCamelCase, formatConversionCheck} = require("./utils/index");

/**
 * 插件被激活时触发，所有代码总入口
 * @param {*} context 插件上下文
 */
const activate = (context) => {
	console.log('恭喜，您的扩展“vscode-extensions-demo”已被激活！');
	// Hello Word示例
	// 命令事件进行注册
	let disposableOne = vscode.commands.registerCommand('vscode-extension-demo.helloWorld', () => {
		// 命令执行时触发
		const showMessage = `vscode插件实现示例：Hello World Demo from vscode-extension-demo!`
		vscode.window.showInformationMessage(showMessage);
	});

	// 格式转换：snakeCase to camelCase
	let disposableTwo = vscode.commands.registerCommand(
		"formatConversion.camelCase",
		() => {
		  const activeEditor = vscode.window.activeTextEditor;
		  if (!activeEditor) {
			return;
		  }
		  const { selection } = activeEditor;
		  const selected = activeEditor.document.getText(selection);
		  try {
			if(formatConversionCheck(selected)) {
				return vscode.window.showInformationMessage(
					"亲：这种格式我转换不了呀 ~ "
				);
			}
			if (selected.length > 66) {
				return vscode.window.showInformationMessage(
					"亲：太长了我转换不了啦 ~ "
				);
			}
			const humpNamingString = toCamelCase(selected);
			activeEditor.edit((editBuilder) => {
			  editBuilder.replace(activeEditor.selection, humpNamingString);
			});
		  } catch (error) {
			console.log("error", error);
			vscode.window.showInformationMessage("程序错误" + error);
		  }
		}
	);

	context.subscriptions.push(...[disposableOne, disposableTwo]);
}

/**
 * 插件被释放时触发
 */
const deactivate = () => console.log('您的扩展“vscode-plugin-demo”已被释放！');

module.exports = {
	activate,
	deactivate
}
