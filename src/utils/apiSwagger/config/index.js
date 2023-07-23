const path = require('path');
const DEFAULT_CONFIG = {
  IMPORT_TEXT: `import http from "@/api";\n`,
  HTTP_NAME: 'http',
  DIR_PATH: path.resolve(process.cwd(), './src/api/modules/'),
  INTERFACE_PATH: './src/api/interface.ts'
};
module.exports = DEFAULT_CONFIG;
