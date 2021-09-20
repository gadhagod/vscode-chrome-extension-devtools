import * as vscode from "vscode";
import { manifestFormat } from "../utils";

var hoverableManifestFields = function() {
    let ls = {};
    Object.keys(manifestFormat).forEach((key) => {
        let value = (manifestFormat as any)[key];
        if (Object.keys(value).length > 0) {
            (ls as any)[key] = value;
        }
    });
    return ls;
}() as any;

/**
 * Shows documentation for manifest.json keys
 * @param {vscode.TextDocument} editor
 * @param {vscode.Position} position
 */
export default (editor: vscode.TextDocument, position: vscode.Position) => {
    let word = editor.getText(editor.getWordRangeAtPosition(position));
    word = word.substring(1, word.length - 1);
    if (Object.keys(hoverableManifestFields).includes(word) && Object.keys(hoverableManifestFields[word]).length > 0) {

        let hoverStr = `**${word}**
***
${hoverableManifestFields[word].desc ?? ""}`;

        if (Object.keys(hoverableManifestFields[word]).includes("link")) {
            hoverStr += `
***
${`[${hoverableManifestFields[word].link.replace("https://", "")}](${hoverableManifestFields[word].link})`}`;
        }

        return new vscode.Hover(
            new vscode.MarkdownString(hoverStr)
        );
    }
    return;
}