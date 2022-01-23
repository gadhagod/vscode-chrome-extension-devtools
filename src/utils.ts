import { readFileSync } from "fs";
import * as vscode from "vscode";
import * as types from "./types";

/**
 * Registers a list of vscode commands
 * @param {VscodeCommandMetadata[]} commands List of commands to be registered
 * @param {vscode.ExtensionContext} context Context of extension
 */
export function registerCommands(
    commands: types.VscodeCommandMetadata[], 
    context: vscode.ExtensionContext
) {
    commands.forEach((command) => { 
        context.subscriptions.push(vscode.commands.registerCommand(`chrome-extension-developer-tools.${command.name}`, () => { 
            command.func(context); 
        }));
    });
}

/**
 * Builds a webview's HTML by rendering a template
 * @param {string} template HTML template file of webview
 * @param {object} data Data to be passed into template
 */
export function renderWebview(template: string, data: object) {
    let html = readFileSync(vscode.Uri.file(template).fsPath, "utf-8");
    let variables = Object.keys(data);
    for(let i = 0; i < variables.length; i++) {
        html = html.replace(`{{${variables[i]}}}`, (data as any)[variables[i]]);
    }
    return html;
}