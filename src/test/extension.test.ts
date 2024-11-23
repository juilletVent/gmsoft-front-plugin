import { getImportAst } from "../utils/getImportAst";
import { testCode } from "./testCode";

function sum(a: number, b: number) {
  return a + b;
}

test("getImportAst", () => {
  const importAst = getImportAst(testCode);
  console.log("importAst: ", importAst);

  expect(sum(1, 2)).toBe(3);
});
