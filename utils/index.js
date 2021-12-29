const formatConversionCheck = str => str.indexOf('_') === -1;

const humpNaming = str => {
    const wordList = str.split(" "); // ['Format', 'conversion']
    let result = wordList.reduce((total, next, index) => {
      if (index === 0) {
        return total + next.replace(next.charAt(0), next.charAt(0).toLowerCase());
      } else {
        return total + next.replace(next.charAt(0), next.charAt(0).toUpperCase());
      }
    }, "");
    return result;
}

const constCase = str => {
    const wordList = str.split(" "); // ['Format', 'conversion']
    const constCaseResult = wordList.map(item => item.toUpperCase());
    return constCaseResult.join('_');
}


const snakeCase = str => {
    const wordList = str.split(" "); // ['Format', 'conversion']
    const constCaseResult = wordList.map(item => item.toLowerCase());
    return constCaseResult.join('_');
}

const paramCase = str => {
    const wordList = str.split(" "); // ['Format', 'conversion']
    const constCaseResult = wordList.map(item => item.toLowerCase());
    return constCaseResult.join('-');
}

const isChineseString = str => (/^[\u4e00-\u9fa5]+$/i.test(str)) 

const toSnakeCase = (str, formatType) => {
    // _\w 表示_和后面的一个字母。(\w)括号扩起来表示子项。g表示所有的
    const reg1 = /_(\w)/g;
    const reg2 = /-(\w)/g;
    switch(formatType) {
        case 'snakeCase':
            if(reg1.test(str)) {
                return str.toLowerCase();
            } else if(reg2.test(str)) {
                return str.replace(reg2, ($0, $1) =>  '_' + $1).toLowerCase();
            } else {
                return str.replace(/([A-Z])/g, $1 => '_' + $1.toLowerCase());
            }
        case 'camelCase':
            if(reg1.test(str)) {
                const temp = str.toLowerCase();
                return temp.replace(reg1, ($0, $1) => $1.toUpperCase());
            } else if (reg2.test(str)) {
                const temp = str.toLowerCase();
                return temp.replace(reg2, ($0, $1) => $1.toUpperCase());
            }
        case 'paramCase':
            if(reg2.test(str)) {
                return str.toLowerCase();
            } else if(reg1.test(str)) {
                return str.replace(reg1, ($0, $1) => '-' + $1).toLowerCase();
            } else {
                return str.replace(/([A-Z])/g, $1 => '-' + $1.toLowerCase());
            }
        case 'constCase':
            if(reg2.test(str)) {
                return str.replace(reg2, ($0, $1) => '_' + $1).toUpperCase();
            } else if(reg1.test(str)) {
                return str.toUpperCase();
            } else {
                return str.replace(/([A-Z])/g, $1 => '_' + $1.toLowerCase()).toUpperCase();
            }
        default:
            return str;
    }
}

module.exports = {
    formatConversionCheck,
    toSnakeCase,
    humpNaming,
    constCase,
    snakeCase,
    paramCase,
    isChineseString
};
  