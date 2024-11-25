import * as vscode from "vscode";

export function getVsConfig(configKey: string) {
  const config = vscode.workspace.getConfiguration("gmsoft-front-plugin");
  return config.get<boolean>(configKey, true);
}
