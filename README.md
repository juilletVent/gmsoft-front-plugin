# gmsoft-front-plugin

大家软件前端开发辅助插件

## 指令与快捷键

| 指令                                | 默认快捷键     | 说明                                               |
| ----------------------------------- | -------------- | -------------------------------------------------- |
| `gmsoft-front-plugin.order-imports` | `Ctrl+Shift+Z` | 重排 Import 导入，符合 Eslint 要求，满足强迫症需求 |

## 关于打包问题

由于`vsce`不支持 pnpm 的链接依赖，所以不能使用 pnpm，或者 yarn 的 pnp 模式，只能使用默认的 npm 模式或者 yarn 的 classic 模式安装依赖才能正确完成打包。
