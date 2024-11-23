import * as vscode from "vscode";

async function A() {
  // 获取当前工作区的文件夹
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    vscode.window.showErrorMessage("当前没有打开任何工作区。");
    return;
  }

  // 假设读取工作区的第一个文件夹
  const workspaceUri = workspaceFolders[0].uri;

  // 构造 package.json 文件的完整路径
  const packageJsonUri = vscode.Uri.joinPath(workspaceUri, "package.json");

  // 读取文件内容
  const fileContent = await vscode.workspace.fs.readFile(packageJsonUri);

  // 将 Uint8Array 转换为字符串
  const contentString = Buffer.from(fileContent).toString("utf-8");

  // 解析 JSON 内容
  const packageJson = JSON.parse(contentString);

  // 输出或操作 package.json 的内容
  console.log("package.json 内容:", packageJson);
  vscode.window.showInformationMessage(`项目名称: ${packageJson.name}`);
}
