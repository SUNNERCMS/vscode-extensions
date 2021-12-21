// snakeCase to camelCase
const toCamelCase = str => {
    // _\w 表示_和后面的一个字母。(\w)括号扩起来表示子项。g表示所有的
    var reg = /_(\w)/g;
    // 形参$0表示正则的整体_(\w)，$1表示正则的第一个子项(\w)
    return str.replace(reg, ($0, $1) =>  $1.toUpperCase())
}

// camelCase to snakeCase
const toSnakeCase = str => {
    return str.replace(/([A-Z])/g, $1 => '_' + $1.toLocaleLowerCase());
}

const formatConversionCheck = str => str.indexOf('_') === -1;

module.exports = {
    toCamelCase,
    formatConversionCheck,
    toSnakeCase
};
  