import * as vscode from "vscode";
import * as types from "./types";
import { spawnSync } from "child_process";

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
    })
}
/**
 * Returns if webpack is installed globally
 * @returns {boolean}
 */
export function isWebpackInstalled(): boolean {
    return !(spawnSync("webpack", ["--help"]).error);
}
/**
 * Manifest format
 * @constant
 */
export const manifestFormat = {
    manifest_version: {
        desc: "Indicates the format of `manifest.json`",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifestVersion"
    },
    name: {
        desc: "Short, plain text string that identify the extension",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/name"
    },
    version: {
        desc: "One to four dot-separated integers identifying the version of this extension",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/version"
    },
    default_locale: {
        desc: "Specifies the subdirectory of _locales that contains the default strings for this extension",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/default_locale"
    },
    description: {
        desc: "A plain text string that describes the extension",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/description"
    },
    icons: {
        desc: "One or more icons that represent the extension, app, or theme",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/icons"
    },
    browser_action: {
        desc: "Put icons in the main Google Chrome toolbar, to the right of the address bar. In addition to its icon, a browser action can have a tooltip, a badge, and a popup.",
        link: "https://developer.chrome.com/docs/extensions/reference/browserAction"
    },
    page_action: {
        desc: "Put icons in the main Google Chrome toolbar, to the right of the address bar. Represents actions that can be taken on the current page, but that aren't applicable to all pages..",
        link: "https://developer.chrome.com/docs/extensions/reference/pageAction"
    },
    action: {
        desc: "Control the extensin's icon the Google Chrome toolbar",
        link: "https://developer.chrome.com/docs/extensions/reference/action"
    },
    author: {
        desc: "Creator(s) of the extension",
    },
    automation: {
        desc: "Access automation tree for the browser",
        link: "https://developer.chrome.com/docs/extensions/reference/automation"
    },
    background: {
        desc: "Run scripts in the background of the browser",
        link: "https://developer.chrome.com/docs/extensions/mv2/background_pages"
    },
    chrome_settings_overrides: {
        desc: "Override selected Chrome settings",
        link: "https://developer.chrome.com/docs/extensions/mv2/settings_override/"
    },
    commands: {
        desc: "Add keyboard shortuts that trigger actions in extension",
        link: "https://developer.chrome.com/docs/extensions/reference/commands"
    },
    content_capabilities: {
        desc: "Grants special permissions to websites",
    },
    content_scripts: {
        desc: "Let files run in context of web pages",
        link: "https://developer.chrome.com/docs/extensions/mv2/content_scripts/"
    },
    content_security_policy: {
        desc: "Policy to mitigate against cross-site scripting",
        link: "https://developer.chrome.com/docs/apps/contentSecurityPolicy"
    },
    converted_from_user_script: { /*No documentation*/} ,
    cross_origin_embedder_policy: {
        desc: "Lets extension specify a value for [Cross-Origin-Embedder-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy) response header for requests to the extension's origin",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/cross_origin_embedder_policy"
    },
    cross_origin_opener_policy: {
        desc: "Specify a value for the [Cross-Origin-Opener-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy) response header for requests to the extension's origin",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/cross_origin_opener_policy"
    },
    current_locale: { /*No documentation*/ },
    declarative_net_request: {
        desc: "Block or modify network requests by specifying declarative rules",
        link: "https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest"
    },
    devtools_page: {
        desc: "Add functionality to Chrome devtools",
        link: "https://developer.chrome.com/docs/extensions/mv2/devtools"
    },
    differential_fingerprint: { /*No documentation*/ },
    event_rules: {
        desc: "Add rules that intercept, block, or modify web requests in-flight using [declarativeWebRequest](https://developer.chrome.com/docs/extensions/reference/declarativeWebRequest) or take actions depending on the content of a page, without requiring permission to read the page's content.",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/event_rules"
    },
    externally_connectable: {
        desc: "Declare which extensions, apps, and web pages can connect to your extension via [`runtime.connect`](https://developer.chrome.com/docs/extensions/reference/runtime/#method-connect) and [`runtime.sendMessage`](https://developer.chrome.com/docs/extensions/reference/runtime/#method-sendMessage)",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/externally_connectable"
    },
    file_browser_handlers: {
        desc: "Extend the Chrome OS file browser",
        link: "https://developer.chrome.com/docs/extensions/reference/fileBrowserHandler"
    },
    file_system_provider_capabilities: {
        desc: "Create file systems that can be accessible from the file manager on Chrome OS",
        link: "https://developer.chrome.com/docs/extensions/reference/fileSystemProvider"
    },
    homepage_url: {
        desc: "The URL of the homepage for this extension",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/homepage_url"
    },
    host_permissions: { /*No documentation*/ },
    import: { /*No documentation*/ },
    incognito: {
        desc: "Specify how this extension will behave if allowed to run in incognito mode",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/incognito"
    },
    input_compenents: { /*No documentation*/ },
    key: {
        desc: "Control unique ID of extension, app, or theme when it is loaded during development",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/key"
    },
    minimum_chrome_version: {
        desc: "The version of Chrome that your extension, app, or theme requires",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/minimum_chrome_version"
    },
    nacl_modules: {
        desc: "One or more mappings from MIME types to the Native Client module that handles each type",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/nacl_modules"
    },
    natively_connectable: { /*No documentation*/ },
    oauth2: { /*No documentation*/ },
    offline_enabled: {
        desc: "Whether the app or extension is expected to work offline",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/offline_enabled"
    },
    omnibox: {
        desc: "Register a keyword with Google Chrome's address bar",
        link: "https://developer.chrome.com/docs/extensions/reference/omnibox"
    },
    optional_permissions: {
        desc: "Request declared optional permissions at run time rather than install time, so users understand why the permissions are needed and grant only those that are necessary",
        link: "https://developer.chrome.com/docs/extensions/reference/permissions"
    },
    options_page: {
        desc: "Allow users to customise the behavior of an extension on a page",
        link: "https://developer.chrome.com/docs/extensions/mv2/options"
    },
    options_ui: {
        desc: "Allow users to adjust extension options without navigating away from the extensions management page inside an embedded box",
        link: "https://developer.chrome.com/docs/extensions/mv2/options/#embedded_options"
    },
    permissions: {
        desc: "Request access to Chrome resources and URLs",
        link: "https://developer.chrome.com/docs/extensions/reference/permissions"
    },
    platforms: { /*No documentation*/ },
    replacement_web_app: {
        desc: "Dissuade users from installing apps or extensions that will not work on their computer",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/requirements"
    },
    sandbox: {
        desc: "Defines a collection of app or extension pages that are to be served in a sandboxed unique origin, and optionally a Content Security Policy to use with them",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/sandbox"
    },
    short_name: {
        desc: "**Short** plain text string that identifies the extension",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/name/"
    },
    storage: {
        desc: "Define a storage JSON schema for `managed` storage",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/storage"
    },
    system_indicator: { /*No documentation*/ },
    tts_engine: {
        desc: "Impliment a text-to-speech engine using an extension",
        link: "https://developer.chrome.com/docs/extensions/reference/ttsEngine"
    },
    update_url: { /*No documentation*/ },
    version_name: {
        desc: "Descriptive version string that will be used for display purposes if present",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/version/#version_name"
    },
    web_accessible_resources: {
        desc: "Paths of packaged resources that are expected to be usable in the context of a web page",
        link: "https://developer.chrome.com/docs/extensions/mv2/manifest/web_accessible_resources"
    }
}
/**
 * Registers a list of vscode hovers
 * @param {VscodeCommandFunc[]} hoversFuncs Functions that identify and execute actions on hovers
 */
export function registerHovers(hoversFuncs: types.VscodeHoverFunc[]) {
    hoversFuncs.forEach((hover) => {
        vscode.languages.registerHoverProvider({ pattern: "**/manifest.json" }, {
            provideHover(editor, position) {
                return hover(editor, position);
            }
        });
    })
}