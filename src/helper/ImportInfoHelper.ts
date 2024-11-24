import { ImportDeclaration, Node } from "@babel/types";

type ImportType =
  | "defaultImport"
  | "namedImport"
  | "mixImport"
  | "resourceImport";

type LibType = "npm-organize" | "npm" | "alias" | "relative";

export class ImportInfoClass {
  /** 导入类型 */
  importType: ImportType;
  /** 模块类型 */
  libType: LibType;
  /** 默认导入符号长度 */
  defaultImportSymbolLength: number;
  /** 命名导入符号长度 */
  namedImportSymbolLength: number;
  /** 库符号长度 */
  libSymbolLength: number;
  /** 写出源码时是否增加额外后置换行符，用于控制分组 */
  extraNewLine?: boolean;

  /** AST */
  ast: ImportDeclaration;

  constructor(ast: ImportDeclaration) {
    this.importType = "defaultImport";
    this.libType = "npm";
    this.ast = ast;
    this.libSymbolLength = ast.source.value.length;
    this.defaultImportSymbolLength = 0;
    this.namedImportSymbolLength = 0;

    // ================================= 计算符号导入类型、符号长度、库长度 =================================
    if (ast.specifiers.length > 0) {
      ast.specifiers.forEach((symbolItem) => {
        // 默认导入符号
        if (symbolItem.type === "ImportDefaultSpecifier") {
          this.defaultImportSymbolLength += symbolItem.local.name.length;
        }
        // 命名导入符号
        if (symbolItem.type === "ImportSpecifier") {
          this.namedImportSymbolLength += symbolItem.local.name.length;
        }
      });
    }

    // 如果没有导入符号，则是资源导入，例如：import "./index.css";
    if (this.ast.specifiers.length === 0) {
      this.importType = "resourceImport";
    }

    if (this.ast.specifiers.length === 1) {
      this.importType =
        // 导入符号类型为DefaultImport，则是默认导入, 否则是命名导入
        ast.specifiers[0].type === "ImportDefaultSpecifier"
          ? "defaultImport"
          : "namedImport";
    }

    if (this.ast.specifiers.length > 1) {
      // 存在符号类型为ImportDefaultSpecifier的导入符号，则是混合导入
      if (
        ast.specifiers.some(
          (specifier) => specifier.type === "ImportDefaultSpecifier"
        )
      ) {
        this.importType = "mixImport";
      } else {
        // 如果存在多个导入符号，且不存在符号类型为ImportDefaultSpecifier的导入符号，则是命名导入
        this.importType = "namedImport";
      }
    }

    // ================================= 计算库类型 =================================
    const libSymbol = ast.source.value;

    // 别名导入
    if (libSymbol.startsWith("@/")) {
      this.libType = "alias";
    } else if (libSymbol.startsWith("./") || libSymbol.startsWith("../")) {
      this.libType = "relative";
    } else if (libSymbol.match(/^@(?!\/)/)) {
      this.libType = "npm-organize";
    } else {
      // npm普通包导入
      this.libType = "npm";
    }
  }

  get importSymbolLength() {
    return this.defaultImportSymbolLength + this.namedImportSymbolLength;
  }
}
