const {
  getApiName,
  getLastStr,
  urlParamReplaceStr,
  prettierCode
} = require('../utils/index');
const fse = require('fs-extra');
const path = require('path');
const DEFAULT_CONFIG = require('../config/index');
/**
 * @description 生成api文件
 * @param  paths swagger paths
 * @param  tags  swagger tags
 */
function genApi(paths, tags) {
  // 通过tags分组, 每个tag下的api
  const apiGroup = getApiGroup(paths, tags);
  Object.keys(apiGroup).forEach((item) => {
    genApiCode(item, apiGroup[item]);
  });
}
module.exports.genApi = genApi;

function getApiGroup(paths, tags) {
  const apiGroup = {};
  tags.forEach((tag) => {
    apiGroup[tag.name] = {};
    apiGroup[tag.name].apiList = [];
    apiGroup[tag.name].schemaList = [];
    Object.keys(paths).forEach((url) => {
      Object.keys(paths[url]).forEach((method) => {
        if (paths[url][method]?.tags?.[0] === tag.name) {
          const { parameters, responses, requestBody } = paths[url][method];
          apiGroup[tag.name].schemaList.push(
            ...getSchemaList(
              responses?.[200]?.content?.[`application/json`]?.schema
                ?.allOf?.[1]?.properties?.data,
              requestBody,
              apiGroup[tag.name].schemaList
            )
          );
          const schemasCode = getResponseParams(
            responses?.[200]?.content?.[`application/json`]?.schema?.allOf?.[1]
              ?.properties?.data
          );
          apiGroup[tag.name].apiList.push({
            apiName: getApiName(paths[url][method].operationId), // 接口名称
            url: urlParamReplaceStr(url), // 请求路径
            method, // 请求方法
            reqParamsText: getUrlParams(parameters), // url中的请求参数
            reqBodyText: getBodyParams(requestBody), // body中的请求参数
            schemas: schemasCode, // 返回的数据类型
            apiDesc: responses?.[200]?.description, // 接口描述
            tagName: tag.name
          });
        }
      });
    });
  });
  return apiGroup;
}

/**
 * @description 生成api文件
 */
async function genApiCode(tagName, apiList) {
  const apiPath = path.resolve(DEFAULT_CONFIG.DIR_PATH, `./${tagName}.ts`);
  fse.ensureFileSync(path.resolve(apiPath));
  let code = DEFAULT_CONFIG.IMPORT_TEXT;
  const schemaList = new Set(apiList.schemaList);
  code += `import { ${Array.from(schemaList).join(
    ','
  )} } from '@/api/interface';\n`;
  apiList.apiList.forEach((item) => {
    code += ` /** ${item.apiDesc} */\n`;
    code += `export function ${item.apiName}(${
      item.reqParamsText ? item.reqParamsText : ''
    }${item.reqBodyText ? item.reqBodyText : ''}) {\n`;
    code +=
      `  return ${DEFAULT_CONFIG.HTTP_NAME}.${item.method}${
        item.schemas ? `<${item.schemas}>` : ''
      }(` +
      '`' +
      `${item.url.replace(/'/g, '')}` +
      '`,' +
      `{\n`;
    code += `    ${item.reqBodyText ? 'params' : ''}\n`;
    code += `  });\n`;
    code += `}\n`;
  });
  let prettierText = prettierCode(code);
  await fse.writeFile(apiPath, prettierText, () => {
    return Promise.resolve();
  });
}

/**
 * @description 获取响应参数泛型
 * @param { object } paramsData 响应参数
 */
function getResponseParams(paramsData) {
  if (!paramsData || paramsData?.type === 'null') return '';
  let schemas = {};
  if (paramsData?.type) {
    schemas = getLastStr(paramsData.properties.list.items.$ref, '/');
    return `ResultData<${schemas}>`;
    // [`ResultPageData<${schemas}>`, schemas];
  } else {
    schemas = getLastStr(paramsData.$ref, '/');
    return `ResultData<${schemas}>`;
  }
}

/**
 * @description 获取请求url中的参数
 */
const getUrlParams = (parameters) => {
  if (!parameters && parameters.length) return '';
  let urlParamsText = '';
  parameters.forEach((item) => {
    if (item.in === 'path') {
      urlParamsText += `${item.name}${item.required ? '' : '?'}: ${
        item.schema.type
      },`;
    }
  });
  return urlParamsText;
};

/**
 * @description 获取请求body中的参数
 * @param { object } requestBody 请求body
 * @return { string }
 */
const getBodyParams = (requestBody) => {
  if (!requestBody) return '';
  const { content, required } = requestBody;
  let schema = getLastStr(content?.['application/json']?.schema?.$ref, '/');
  let bodyParamsText = `params${required ? '' : '?'}: ${schema}`;
  return bodyParamsText;
};

/**
 * @description 获取schemaList
 * @param { object } paramsData 响应参数
 * @param { array } schemaList schemaList
 */
const getSchemaList = (paramsData, requestBody) => {
  const schemaList = [];
  let schemas = {};
  schemas = getLastStr(
    paramsData?.type
      ? paramsData?.properties?.list?.items?.$ref
      : paramsData?.$ref,
    '/'
  );
  if (!schemaList.includes(schemas) && schemas) {
    schemaList.push(schemas);
  }
  paramsData?.type
    ? !schemaList.includes('ResultData') && schemaList.push('ResultData')
    : !schemaList.includes('ResultData') && schemaList.push('ResultData');
  // !schemaList.includes('ResultPageData') &&schemaList.push('ResultPageData');
  if (requestBody) {
    const { content } = requestBody;
    let schema = getLastStr(content?.['application/json']?.schema?.$ref, '/');
    schema && !schemaList.includes(schema) && schemaList.push(schema);
  }
  return schemaList;
};
