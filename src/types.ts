import * as vscode from "vscode";

/**
 * Function to be executed with a VSCode command
 */
export interface VscodeCommandFunc {
    /**
     * @param context Context of extension
     */
    (context: vscode.ExtensionContext): void;
}
/**
 * Metadata of a vscode command
 * @property {string} name Name of command
 * @property {VscodeCommandFunc} func Function to be executed with command
 */
export interface VscodeCommandMetadata {
    name: string;
    func: VscodeCommandFunc;
}
/**
 * Function to be executed on a hover
 */
export interface VscodeHoverFunc {
    /**
     * @param {vscode.TextDocument} editor Active editor
     * @param {vscode.Position} position Position of hovered word
     * @returns {vscode.Hover | undefined}
     */
    (editor: vscode.TextDocument, position: vscode.Position): vscode.Hover | undefined;
}
