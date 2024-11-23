import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "gmsoft-front-plugin" is now active!'
  );

  const disposable = vscode.commands.registerCommand(
    "gmsoft-front-plugin.helloWorld",
    () => {
      vscode.window.showInformationMessage(
        "Hello World from gmsoft-front-plugin OHHHHHHHHHHHHHHHHH!"
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
