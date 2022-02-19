// vscode官方文档：https://code.visualstudio.com/api/references/vscode-api

/**
 * 插件被激活时触发，所有代码总入口
 * @param {*} context 插件上下文
 */

const activate = context => {
    console.log('恭喜，您的扩展“vscode-exports-easywork”已被激活！');
    require('./helloword')(context); // helloworld
    require('./humpCase')(context);  // helloWorld 
    require('./constCase')(context); // HELLO_WORLD 
    require('./snakeCase')(context); // hello_world 
    require('./paramCase')(context); // hello-world 

};

/**
 * 插件被释放时触发
 */
const deactivate = () => console.log('您的扩展“vscode-exports-easywork”已被释放！');

module.exports = {
	activate,
	deactivate
}

// import {memo} from 'react';
// const Demo = () => {
// return <div></div>
// }
// export default memo(Demo);