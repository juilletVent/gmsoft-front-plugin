# gmsoft-front-plugin README

快捷键：`Ctrl+Shift+Z`，快速重排 Import 导入

## 关于打包问题

由于`vsce`不支持 pnpm 的链接依赖，所以先使用`tsup`进行打包，然后再使用`vsce`进行二次打包并忽略依赖

```json
{
  "prepackage": "tsup src/extension.ts --format cjs --external vscode --no-shims",
  "package": "vsce package --no-dependencies",
  "prepublish": "tsup src/extension.ts --format cjs --external vscode --no-shims",
  "publish": "vsce publish --no-dependencies"
}
```
