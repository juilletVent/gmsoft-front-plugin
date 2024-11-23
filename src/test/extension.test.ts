import { getImportAst } from "../utils/getImportAst";
import { testCode } from "./testCode";
import { getImportStartAndEndPosition } from "../utils/getImportStartAndEndPosition";
import { table } from "console";

function sum(a: number, b: number) {
  return a + b;
}

test("getImportAst", () => {
  const importAst = getImportAst(testCode);
  console.log("importAst: ", importAst);
  expect(sum(1, 2)).toBe(3);
});

test("getImportLibName", () => {
  const importInfo = getImportAst(testCode);

  const [importStart, importEnd] = getImportStartAndEndPosition(importInfo);
  console.log("importStart: ", importStart);
  console.log("importEnd: ", importEnd);

  const infoTable: (number | string)[][] = [
    [
      "importType",
      "libType",
      "libSymbolLength",
      "importSymbolLength",
      // "defaultImportSymbolLength",
      // "namedImportSymbolLength",
      "libName",
    ],
  ];

  importInfo.forEach((info) => {
    infoTable.push([
      info.importType,
      info.libType,
      info.libSymbolLength,
      info.importSymbolLength,
      // info.defaultImportSymbolLength,
      // info.namedImportSymbolLength,
      info.ast.source.value,
    ]);
  });

  table(infoTable);

  expect(sum(1, 2)).toBe(3);
});
