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

  return importAst.map((astItem) => new ImportInfoClass(astItem));
}
