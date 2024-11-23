import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "gmsoft-front-plugin" is now active!'
  );

  const disposable = vscode.commands.registerCommand(
    "gmsoft-front-plugin.order-imports",
    () => {
      vscode.window.showInformationMessage(
        "Hello World from gmsoft-front-plugin !"
      );

      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      // 获取当前编辑器的文档内容
      const document = editor.document;

      // 获取Import语句起始位置和结束位置
      const importRange = new vscode.Range(
        new vscode.Position(0, 0),
        new vscode.Position(1, 0)
      );

      editor.edit((editBuilder) => {
        // 删除所有import语句
        editBuilder.delete(importRange);
        // 重新插入排序后的import语句
        editBuilder.insert(
          new vscode.Position(0, 0),
          "import React from 'react';\n"
        );
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
