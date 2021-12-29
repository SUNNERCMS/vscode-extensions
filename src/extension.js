// vscode官方文档：https://code.visualstudio.com/api/references/vscode-api
const vscode = require('vscode');

/**
 * 插件被激活时触发，所有代码总入口
 * @param {*} context 插件上下文
 */

const activate = context => {
    console.log('恭喜，您的扩展“vscode-plugin-demo”已被激活！');
    console.log(vscode);
    require('./helloword')(context); // helloworld
    require('./camelCase')(context); // hello_word  ->  helloWord
    require('./constCase')(context); // hello_word  ->  helloWord
    require('./snakeCase')(context); // hello_word  ->  helloWord
    require('./paramCase')(context); // hello_word  ->  helloWord

};

/**
 * 插件被释放时触发
 */
const deactivate = () => console.log('您的扩展“vscode-plugin-demo”已被释放！');

module.exports = {
	activate,
	deactivate
}