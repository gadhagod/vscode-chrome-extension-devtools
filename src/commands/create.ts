import * as vscode from "vscode";
import { readFileSync } from "fs";
import { join } from "path";
const createExtension = require("chrome-extension-cli-client").createExtension;

/**
 * Creates a new Chrome extension
 * @param {vscode.ExtensionContext} context
 */
export default (context: vscode.ExtensionContext) => {
    let initializationScreen = vscode.window.createWebviewPanel(
        "New Chrome Extension",
        "New Chrome Extension",
        vscode.ViewColumn.One,
        {
            enableScripts: true
        }
    );

    initializationScreen.webview.html = readFileSync(vscode.Uri.file(join(context.extensionPath, "webviews", "initializationScreen.html")).fsPath, "utf-8");

    initializationScreen.webview.onDidReceiveMessage(
        (res: {
            status: "OK" | "ERR" | "GET" | "GIVE",
            message: any
        }) => {
            console.log(res);

            if (res.status === "ERR") {
                vscode.window.showErrorMessage(res.message as string);
                return;
            }

            if (res.status === "GET") {
                vscode.window.showOpenDialog({
                    title: "Choose a location",
                    openLabel: "Select",
                    canSelectFiles: false,
                    canSelectFolders: true,
                    canSelectMany: false
                }).then((locations) => {
                    initializationScreen.webview.postMessage({
                        status: "GIVE",
                        message: { path: (locations as vscode.Uri[])[0].fsPath }
                    });
                })
                return;
            }

            let config = res.message as { projectName: string, extensionType: string, chosenPath: string };

            try {
                createExtension(
                    config.projectName,
                    {
                        overridePage: config.extensionType === "override_page",
                        devtools: config.extensionType === "devtools"
                    },
                    join(config.chosenPath),
                    (str: string) => { }
                );
                initializationScreen.dispose();

                vscode.commands.executeCommand("vscode.openFolder", vscode.Uri.file(join(config.chosenPath, config.projectName)), {
                    forceNewWindow: true
                })
            } catch (e) {
                console.log(e);
                let err = e as { message: string };
                vscode.window.showErrorMessage("ERROR: " + (err).message);
                initializationScreen.webview.postMessage({
                    status: "ERR",
                    message: err.message
                })
            }
        },
        undefined,
        context.subscriptions
    )
}
