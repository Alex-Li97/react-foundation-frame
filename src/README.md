# React18 + Ts + Vite
# 环境搭建
1. 安装eslint、prettier、lint-staged、husky、stylelint，集成代码校验，git commit校验
2. 建立项目目录
3. 后续集成antd scss...等项目依赖


## 目录结构
```bash
├─src                                  # 源代码目录
   |_api                               # axios接口相关
   |_assets                            # 静态资源
   |_common                            # 通用组建
   |_components                        # 组件
   |_constants                         # 常量
   |_router                            # 路由配置
   |_store                             # reduce
   |_utils                             # 工具目录
   |_view                              # 路由页面
├─.eslintrc.cjs                        # eslint校验文件
├─.prettierrc.cjs                      # 代码格式化配置
├─.stylelintrc.cjs                     # css样式格式化配置
├─commitlint.config.cjs                # husky校验配置
├─package.json                         # 项目说明
├─README.md                            # REAME 文档
├─vite.config.ts                       # vite相关配置
```