const vscode = require('vscode');
const Translator = require("./Translator");
const {isChineseString, toSnakeCase} = require('./index');
const translator = new Translator();


const formatConversionHandle = (formatFunc, formType) => async () => {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
      return;
    }
    const { selection, document } = activeEditor;
    const selected = document.getText(selection);
    try {
          if (selected.length > 30) {
              return vscode.window.showInformationMessage(
                  "亲：太长了我转换不了啦 ~ "
              );
          }
          if(isChineseString(selected)) {
            const resultStr = await translator.translate(selected);
            const resData = JSON.parse(resultStr);
            // targetData: 'Format conversion'
            const targetData = resData.translation[0] || ""; 
            const humpNamingString = formatFunc(targetData);
            activeEditor.edit((editBuilder) => {
              editBuilder.replace(activeEditor.selection, humpNamingString);
            });
          } else {
            activeEditor.edit((editBuilder) => {
                editBuilder.replace(activeEditor.selection, toSnakeCase(selected, formType));
            });
          }
    } catch (error) {
          console.log("error", error);
          vscode.window.showInformationMessage("程序错误" + error);
    }
}


module.exports = {
    formatConversionHandle
};
   