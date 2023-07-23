const path = require('path');
const fse = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');
const { isRequired, prettierCode } = require('../utils');
const DEFAULT_CONFIG = require('../config');

async function genInterface(schemas) {
  const spinner = ora().render();
  spinner.start(`正在生成模块中。。。 \n`);
  const interfacePath = path.resolve(DEFAULT_CONFIG.INTERFACE_PATH);
  /** 判断路径下是否有文件，无则创建 */
  fse.ensureFileSync(interfacePath);
  let patterCode = '';
  /** 全局interface文件 */
  let code = Object.keys(schemas).reduce((acc, pre) => {
    let result = compileType(schemas, pre);
    return `${acc + result}\n`;
  }, '');

  const prettierText = prettierCode(patterCode + code);
  await fse.writeFile(interfacePath, prettierText, () => {
    spinner.succeed(
      chalk.green(`生成模块成功，路径为：${DEFAULT_CONFIG.INTERFACE_PATH}`)
    );
  });
}

module.exports.genInterface = genInterface;

/**
 *  生成文件类型
 * @param { Object } scour swagger单项数据
 * @param { string } interfaceName 文件名
 * @param { Array } ignoreList 需要忽略的文件名列表
 */
function compileType(scour, interfaceName) {
  let { title, properties, required } = scour[interfaceName];
  let tits = title || interfaceName;

  if (!properties) return '';

  let propertiesText = Object.keys(properties).reduce((cur, pre) => {
    return `${cur + getProperties(properties[pre], pre, required)}`;
  }, '');

  let jsDoc = Object.keys(properties).reduce((cur, pre) => {
    return `${cur + compileJsDoc(properties[pre], pre)}`;
  }, '');
  return `/**\n ${jsDoc} */ \n export interface ${
    tits === 'ResultData' ? 'ResultData<T>' : tits
  }{
      ${propertiesText}
    }\n\n`;
}

/**
 * 获取单个属性说明
 * @param { Object } obj Record<string, any>
 * @param { string } title
 * @param { Array } required 必填字段列表
 */
function getProperties(obj, title, required) {
  let code = ``;
  if (obj.description) {
    code += `/** ${obj.description} */\n`;
  }
  code += isRequired(title, required) ? title : `${title}?`;
  code += `: ${
    obj.description?.indexOf('Generics') !== -1 && obj.description
      ? 'T'
      : changType(obj)
  };\n`;
  return code;
}
module.exports.getProperties = getProperties;

/**
 *  将swagger上的类型转成js可识别的类型
 * @param { Object } obj swagger单个properties 属性
 */
function changType(obj) {
  /** 如有特别的类型说明则使用 */
  if (obj.originalRef) {
    return obj.originalRef;
  }

  if (obj.type !== 'array') {
    return integerToJs(obj.type, obj?.enum);
  }

  /** 数组对象或者object需要引用说明 */
  if (obj.type === 'array') {
    let itemType = obj?.items?.type;
    if (itemType) {
      return `${itemType === 'array' ? '[]' : integerToJs(itemType) + '[]'}`;
    } else {
      let list = obj.items['$ref'].split('/');
      return `${list[list.length - 1]}[]`;
    }
  }
}

/**
 * 生成jsDoc注解
 * @param { Object } paramVal Record<string, any>
 * @param { string } paramName
 */
function compileJsDoc(paramVal, paramName) {
  let code = ``;
  code += `* @property ${paramName} ${
    paramVal.description ? paramVal.description : ''
  } \n`;
  return code;
}

/**
 *  swagger数字类型转换成number，或者获取其中的枚举类型
 * @param { string } str swagger 类型
 * @param { Array } enums enums 枚举
 * @param { {} } typeTips 如果str是数组类型，对数组类型的说明
 */
function integerToJs(str, enums = [], typeTips = null) {
  /** 如果有枚举，则设立 */
  const maxLen = enums.length;
  if (maxLen > 0) {
    let code = '';
    enums.forEach((item, index) => {
      code += `"${item}"${index <= maxLen - 2 ? '|' : ''}`;
    });
    return code;
  }
  if (str === 'integer') {
    return 'number';
  }
  if (!str) {
    return 'any';
  }

  /** 数组类型 */
  if (str === 'array') {
    if (typeTips && typeTips.type) {
      return integerToJs(typeTips.type) + '[]';
    } else {
      return '[]';
    }
  }
  return str;
}
