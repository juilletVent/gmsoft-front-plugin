import * as vscode from "vscode";
import generate from "@babel/generator";
import { getImportAst } from "./utils/getImportAst";
import { getImportStartAndEndPosition } from "./utils/getImportStartAndEndPosition";
import { sortImportAst } from "./utils/sortImportAst";
import { convertVSCodePositionToPosition } from "./utils/convert";
import { getVsConfig } from "./utils/getVsConfig";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'gmsoft-front-plugin is now active, have fun with "order-imports" command ^_^ !'
  );

  const disposable = vscode.commands.registerCommand(
    "gmsoft-front-plugin.order-imports",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      // 获取当前编辑器的文档内容
      const document = editor.document;

      // 读取分组配置信息，确定是否需要分组
      const hasGroup = getVsConfig("hasGroup");

      // 检查文件类型，仅处理 ts 和 tsx 文件
      const fileExtension = document.fileName.split(".").pop();
      if (!fileExtension || !["ts", "tsx"].includes(fileExtension)) {
        return;
      }

      // 解析文档中的import语句AST
      const importInfo = getImportAst(document.getText());

      // 计算import语句的起始位置和结束位置
      const [importStart, importEnd] = getImportStartAndEndPosition(importInfo);

      // 对import语句AST进行排序
      const sortedImportAst = sortImportAst(importInfo, hasGroup);

      editor.edit((editBuilder) => {
        // 删除所有import语句
        editBuilder.delete(
          new vscode.Range(
            convertVSCodePositionToPosition(importStart),
            convertVSCodePositionToPosition(importEnd)
          )
        );

        // 重新插入排序后的import语句，从后往前插入，插入的游标就可以固定了，始终在文件头进行插入即可
        sortedImportAst.forEach((importAstItem, index) => {
          let importCode = `${generate(importAstItem.ast).code}${
            index < sortedImportAst.length - 1 ? "\n" : ""
          }`;
          // 如果有额外的换行符，则在import语句后面再增加一个换行符
          if (importAstItem.extraNewLine) {
            importCode = `${importCode}\n`;
          }

          editBuilder.insert(new vscode.Position(0, 0), importCode);
        });
      });

      // const messageHandle = vscode.window.showInformationMessage(
      //   "Import statements have been sorted successfully !"
      // );
      console.log("Import statements have been sorted successfully !");
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
