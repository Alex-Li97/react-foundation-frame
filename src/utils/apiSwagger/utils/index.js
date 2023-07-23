const prettier = require('prettier/standalone');
const parserTypescript = require('prettier/parser-typescript');
const parserBabel = require('prettier/parser-babel');

/**
 *  是否必填
 * @param { string } key 需要匹配的字段
 * @param { Array | undefined} requiredList 如果为true，默认所有数据都是必填项，如果不是，和key对应
 * @return boolean
 */
function isRequired(key, requiredList) {
  if (requiredList) {
    return requiredList?.includes(key);
  } else {
    return true;
  }
}
module.exports.isRequired = isRequired;

/**
 * 文件格式美化
 * @param { string } code 文本字符串
 * @return { string }
 */
function prettierCode(code) {
  return prettier.format(code, {
    plugins: [parserBabel, parserTypescript],
    parser: 'typescript',
    printWidth: 80, // 单行长度
    tabWidth: 2, // 缩进长度
    useTabs: false, // 使用空格代替tab缩进
    semi: true, // 句末使用分号
    singleQuote: true, // 使用单引号
    arrowParens: 'always', // 箭头函数只有一个参数时，也需要括号
    endOfLine: 'lf', // 换行符使用 lf
    trailingComma: 'none' // 多行时尽可能不打印尾随逗号
  });
}
module.exports.prettierCode = prettierCode;

/**
 * @description 获取api名称
 * @param { operationId } operationId
 */
function getApiName(operationId) {
  const arr = operationId.split('_');
  let apiName = '';
  arr.forEach((item) => {
    apiName += item[0].toUpperCase() + item.slice(1);
  });
  return apiName;
}
module.exports.getApiName = getApiName;

/**
 * @description 获取指定的最后一位字符串后的字符
 * @param { string } str 需要截取的字符串
 * @param { string } lastStr 最后一位字符串
 */
function getLastStr(str, lastStr) {
  if (!str && typeof str !== 'string') return '';
  const index = str.lastIndexOf(lastStr);
  return str.slice(index + 1);
}
module.exports.getLastStr = getLastStr;

/**
 * @description 字符串{xx}转成${xx}
 * @param { string } str 需要转换的字符串
 * @return { string }
 */
function urlParamReplaceStr(str) {
  return str.replace(/{/g, '${');
}
module.exports.urlParamReplaceStr = urlParamReplaceStr;
