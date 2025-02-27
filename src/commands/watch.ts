import * as vscode from "vscode";
import { join } from "path";

/**
 * Uses webpack to watch extension files
 * @param {vscode.ExtensionContext} context
 */
export default (context: vscode.ExtensionContext) => {
    let terminal = vscode.window.createTerminal({
        name: "watch",
        iconPath: vscode.Uri.file(join(context.extensionPath, "assets", "chrome.png")),
    });
    terminal.show();
    terminal.sendText(
        "node ./node_modules/webpack/bin/webpack.js --mode=development --watch --config config/webpack.config.js"
    );
};
