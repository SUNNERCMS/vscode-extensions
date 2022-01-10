const vscode = require('vscode');
const Translator = require("./Translator");
const {isChineseString, formatToFormatConversionHandle} = require('./index');
const translator = new Translator();
translator.config = {
  from: "zh_CHS", // zh-CHS(中文) || ja(日语) || EN(英文) || fr(法语) ...
  to: "EN",
  appKey: "445b65d7607c4f71", // https://ai.youdao.com 在有道云上进行注册
  secretKey: "4mWeH4uty1I3krjuChKqil6PgVCat0s8",
};

const formatConversionHandle = (caseFormatHandle, formType) => async () => {
    const activeEditor = vscode.window.activeTextEditor;
    const replaceHandle = formatResult => {
      activeEditor.edit((editBuilder) => {
        editBuilder.replace(activeEditor.selection, formatResult);
      });
    }
    if (!activeEditor) {
      return;
    }
    const { selection, document } = activeEditor;
    const selected = document.getText(selection);
    try {
          if (selected.length > 60) {
              return vscode.window.showInformationMessage(
                  "亲：太长了我转换不了啦 ~ "
              );
          }
          if(isChineseString(selected)) {
            const resultStr = await translator.translate(selected);
            const resData = JSON.parse(resultStr);
            // targetData格式: 'Format conversion'
            const targetData = resData.translation[0] || ""; 
            replaceHandle(caseFormatHandle(targetData, formType));
          } 
          else {
            replaceHandle(formatToFormatConversionHandle(selected, formType))
          }
    } catch (error) {
          console.log("error", error);
          vscode.window.showInformationMessage("程序错误" + error);
    }
}

module.exports = {
    formatConversionHandle
};
   