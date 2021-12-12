import * as vscode from "vscode";
import * as types from "../types";
import { join } from "path";
import { isWebpackInstalled } from "../utils";

/**
 * Uses webpack to package Chrome extension for publishing
 * @param {vscode.ExtensionContext} context
 */
export default (context: vscode.ExtensionContext) => {
    if (!isWebpackInstalled()) {
        vscode.window.showErrorMessage("Please install the webpack CLI with `npm install -g webpack`");
        return;
    }
    let terminal = vscode.window.createTerminal({ name: "build", iconPath: vscode.Uri.file(join(context.extensionPath, "assets", "chrome.png")) });
    terminal.show();
    terminal.sendText("node ./node_modules/webpack/bin/webpack.js --mode=production --config config/webpack.config.js");
}