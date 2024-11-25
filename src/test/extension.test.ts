import generate from "@babel/generator";
import { getImportAst } from "../utils/getImportAst";
import { testCode, exceptCode, tempCode } from "./testCode";
import {
  testCode as testCode2,
  exceptCode as exceptCode2,
  tempCode as tempCode2,
} from "./testCode2";
import { sortImportAst } from "../utils/sortImportAst";
import { getImportStartAndEndPosition } from "../utils/getImportStartAndEndPosition";

test("Order Import", () => {
  let finalImportCode = "";

  // 解析文档中的import语句AST
  const importInfo = getImportAst(testCode);

  // 对import语句AST进行排序
  const sortedImportAst = sortImportAst(importInfo, true);

  // 重新插入排序后的import语句，从后往前插入，插入的游标就可以固定了，始终在文件头进行插入即可
  sortedImportAst.forEach((importAstItem, index) => {
    let importCode = `${generate(importAstItem.ast).code}${
      index < sortedImportAst.length - 1 ? "\n" : ""
    }`;
    // 如果有额外的换行符，则在import语句后面再增加一个换行符
    if (importAstItem.extraNewLine) {
      importCode = `${importCode}\n`;
    }

    finalImportCode = `${finalImportCode}${importCode}`;
  });

  finalImportCode = `${finalImportCode}${tempCode}`;
  expect(finalImportCode).toBe(exceptCode);
});

test("Order Import 2", () => {
  let finalImportCode = "";

  // 解析文档中的import语句AST
  const importInfo = getImportAst(testCode2);

  // 计算import语句的起始位置和结束位置
  const [importStart, importEnd] = getImportStartAndEndPosition(importInfo);
  console.log("importStart: ", importStart);
  console.log("importEnd: ", importEnd);

  // 对import语句AST进行排序
  const sortedImportAst = sortImportAst(importInfo, true);

  // 重新插入排序后的import语句，从后往前插入，插入的游标就可以固定了，始终在文件头进行插入即可
  sortedImportAst.forEach((importAstItem, index) => {
    let importCode = `${generate(importAstItem.ast).code}${
      index < sortedImportAst.length - 1 ? "\n" : ""
    }`;
    // 如果有额外的换行符，则在import语句后面再增加一个换行符
    if (importAstItem.extraNewLine) {
      importCode = `${importCode}\n`;
    }

    finalImportCode = `${finalImportCode}${importCode}`;
  });

  finalImportCode = `${finalImportCode}${tempCode2}`;
  console.log("finalImportCode: ", finalImportCode);

  expect(finalImportCode).toBe(exceptCode2);
});
