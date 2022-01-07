/**
 * @description 格式转换
 * @param {String} str 待转换字符串
 * @param {String} formatType 格式转换类型
 * @return {String}  转换处理结果
 * */
const caseFormatHandle = (str, formatType) => {
    const wordList = str.split(" ");
    switch(formatType) {
        case 'humpCase':
            let result = wordList.reduce((total, next, index) => {
                return total + next.replace(next.charAt(0),
                    index === 0 ? next.charAt(0).toLowerCase() :  next.charAt(0).toUpperCase());
            }, "");
            return result;
        case 'constCase':
            return wordList.map(item => item.toUpperCase()).join('_');
        case 'snakeCase':
            return wordList.map(item => item.toLowerCase()).join('_');
        case 'paramCase':
            return wordList.map(item => item.toLowerCase()).join('-');
        default:
            return str;
    }
}

/**
 * @description 编辑器选择内容是否是汉字
 * @param {String} selectContent 待转换字符串
 * @return {Boolean} 判断boolean值
 * */
const isChineseString = selectContent => (/^[\u4e00-\u9fa5]+$/i.test(selectContent));


/**
 * @description 汉译英后，格式转换触发处理函数
 * @param {String} formatType 格式转换类型
 * @return {str} 格式转换结果
 * */
const formatToFormatConversionHandle = (str, formatType) => {
    let tempStr = '';
    const regOne = /([a-z])([A-Z])/g; 
    const regTwo = /_|-/g;
    if(regTwo.test(str)) {
        tempStr = str.replace(regTwo, ' ').toLowerCase();
    }
    if(regOne.test(str)) {
        tempStr = str.replace( /^([A-Z])/, $0 => $0.toLowerCase()).replace(regOne, "$1 $2");
    }
    return caseFormatHandle(tempStr, formatType);
}

module.exports = {
    formatToFormatConversionHandle,
    isChineseString,
    caseFormatHandle
};
