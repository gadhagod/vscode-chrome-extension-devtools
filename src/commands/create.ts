import * as vscode from "vscode";
import { renderWebview } from "../utils";
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

    let stylesSrc = initializationScreen.webview.asWebviewUri(vscode.Uri.file(join(context.extensionPath, "webviews", "initialization_screen", "styles.css"))).toString();
    let scriptSrc = initializationScreen.webview.asWebviewUri(vscode.Uri.file(join(context.extensionPath, "webviews", "initialization_screen", "index.js"))).toString();
    let chromeImgSrc = initializationScreen.webview.asWebviewUri(vscode.Uri.file(join(context.extensionPath, "assets", "chrome.png"))).toString();

    initializationScreen.webview.html = renderWebview(
        join(context.extensionPath, "webviews", "initialization_screen", "index.html"), 
        {
            "index.js": scriptSrc, 
            "styles.css": stylesSrc, 
            "/assets/chrome.png": chromeImgSrc
        }
    );

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
                });
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
                });
            } catch (e) {
                console.error(e);
                let err = e as { message: string };
                vscode.window.showErrorMessage("ERROR: " + (err).message);
                initializationScreen.webview.postMessage({
                    status: "ERR",
                    message: err.message
                });
            }
        },
        undefined,
        context.subscriptions
    );
};
