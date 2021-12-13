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
