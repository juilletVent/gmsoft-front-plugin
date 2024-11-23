import * as vscode from "vscode";
import { VSCodePosition } from "./getImportStartAndEndPosition";

export function convertVSCodePositionToPosition(
  position: VSCodePosition
): vscode.Position {
  return new vscode.Position(position.line, position.column);
}
