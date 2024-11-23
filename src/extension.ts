import * as vscode from "vscode";
import generate from "@babel/generator";
import { getImportAst } from "./utils/getImportAst";
import { getImportStartAndEndPosition } from "./utils/getImportStartAndEndPosition";
import { sortImportAst } from "./utils/sortImportAst";
import { convertVSCodePositionToPosition } from "./utils/convert";

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

      // 解析文档中的import语句AST
      const importInfo = getImportAst(document.getText());

      // 计算import语句的起始位置和结束位置
      const [importStart, importEnd] = getImportStartAndEndPosition(importInfo);

      // 对import语句AST进行排序
      const sortedImportAst = sortImportAst(importInfo);

      editor.edit((editBuilder) => {
        // 删除所有import语句
        editBuilder.delete(
          new vscode.Range(
            convertVSCodePositionToPosition(importStart),
            convertVSCodePositionToPosition(importEnd)
          )
        );
        // 重新插入排序后的import语句，从后往前插入，插入的游标就可以固定了，始终在文件头进行插入即可
        sortedImportAst.forEach((importAstItem) => {
          editBuilder.insert(
            new vscode.Position(0, 0),
            generate(importAstItem.ast).code + "\n"
          );
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
