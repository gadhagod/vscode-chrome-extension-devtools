import * as vscode from "vscode";
import { registerCommands } from "./utils";

// import commands
import createCommand from "./commands/create";
import watchCommand from "./commands/watch";
import buildCommand from "./commands/build";

// called when extension is activated
export function activate(context: vscode.ExtensionContext) {
    registerCommands(
        [
            { name: "create", func: createCommand },
            { name: "watch", func: watchCommand },
            { name: "build", func: buildCommand },
        ],
        context
    );
}

// Called when extension is deactivated
export function deactivate() {}
