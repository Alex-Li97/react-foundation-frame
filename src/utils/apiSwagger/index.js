const axios = require('axios');
const ora = require('ora');
const { genInterface } = require('./generate/genInterface');
const { genApi } = require('./generate/genApi');

async function getSwaggerJson(url) {
  const spinner = ora().render();
  spinner.start(`正在发送请求到: ${url} \n`);
  let res;
  try {
    res = await axios.get(url);
    if (typeof res.data !== 'object') {
      throw new Error('返回的数据不是 json');
    }
    spinner.succeed('请求结束');
    return res.data;
  } catch (e) {
    spinner.fail('请求失败，可能没有接口权限或者返回格式不正确');
    throw new Error(e);
  }
}

/**
 *  生成api, interface文件
 */
async function apiGenerate() {
  const swaggerUrl = 'http://localhost:3000/api-json';
  const swaggerJson = await getSwaggerJson(swaggerUrl);
  // path 为接口路径，schemas 所有interface，tags 为接口分类
  const {
    paths,
    components: { schemas },
    tags
  } = swaggerJson;
  genInterface(schemas);
  genApi(paths, tags);
  // const { pathList, definitions } = groupByTag(swaggerJson);
}
apiGenerate();
