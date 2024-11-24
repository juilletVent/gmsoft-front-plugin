import { ImportInfoClass } from "src/helper/ImportInfoHelper";

export type VSCodePosition = {
  line: number;
  column: number;
};

export function getImportStartAndEndPosition(importAst: ImportInfoClass[]) {
  let importStart: VSCodePosition = {
    line: 0,
    column: 0,
  };
  let importEnd: VSCodePosition = {
    line: 0,
    column: 0,
  };

  importAst.forEach((node) => {
    if (node.ast.loc?.start.line && node.ast.loc?.end.line) {
      importStart = {
        line: Math.min(importStart.line, node.ast.loc.start.line - 1),
        column: 0,
      };

      if (importEnd.line <= node.ast.loc.end.line - 1) {
        importEnd = {
          line: node.ast.loc.end.line - 1,
          column: node.ast.loc.end.column,
        };
      }
    }
  });

  return [importStart, importEnd];
}
