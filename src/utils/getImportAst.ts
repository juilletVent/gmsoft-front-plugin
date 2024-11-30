import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import { ImportDeclaration } from "@babel/types";
import { ImportInfoClass } from "../helper/ImportInfoHelper";

export function getImportAst(code: string) {
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });

  let importAst: ImportDeclaration[] = [];

  traverse(ast, {
    ImportDeclaration(path) {
      importAst.push(path.node as ImportDeclaration);
    },
  });

  importAst = importAst.reduce((prev, cur, index) => {
    // 过滤头部注释中上一行的内联注释
    if (index > 0 && cur.leadingComments) {
      const prevNode = prev[prev.length - 1];
      if (prevNode.trailingComments) {
        cur.leadingComments = prevNode.trailingComments.filter(
          (comment) => comment.loc?.start.line !== prevNode.loc?.start.line
        );
        prevNode.trailingComments = prevNode.trailingComments.filter(
          (comment) => comment.loc?.start.line === prevNode.loc?.start.line
        );
      }
    }

    // 最后一行，丢弃非本行的尾部注释
    if (index === importAst.length - 1 && cur.trailingComments) {
      cur.trailingComments = cur.trailingComments.filter(
        (comment) => comment.loc?.start.line === cur.loc?.start.line
      );
    }

    prev.push(cur);
    return prev;
  }, [] as ImportDeclaration[]);

  return importAst.map((astItem) => new ImportInfoClass(astItem));
}
