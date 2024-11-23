// 编写一个使用@babel/parser @babel/traverse，解析TS抽象语法树，并寻找import语句的工具函数
import * as parser from "@babel/parser";
import traverse from "@babel/traverse";

export function getImportAst(code: string) {
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });
  console.log("ast: ", ast);

  let importAst: any[] = [];

  traverse(ast, {
    ImportDeclaration(path) {
      importAst.push(path.node);
    },
  });

  return importAst;
}
