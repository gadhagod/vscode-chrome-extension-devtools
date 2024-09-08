# VSCode Chrome Extension Developer Tools

![Downloads](https://img.shields.io/visual-studio-marketplace/d/aaravb.chrome-extension-developer-tools) ![Installs](https://img.shields.io/visual-studio-marketplace/i/aaravb.chrome-extension-developer-tools) \
VSCode support for Chrome extension development.
[View on Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=aaravb.chrome-extension-developer-tools).

## Features

- Initialize chrome extensions in VSCode.
- Package chrome extensions in VSCode.
- Webpack integrations.
- `manifest.json` documentation through hovers.

## Usage

This extension provides three commands that enable you to create, watch, and build a Chrome extension.

To run any of the commands listed below, open the `Command Palette` (use `Ctrl + P`) and type the desired command:

1. **Chrome Extension: Create New**:

   - Description: Creates a new Chrome extension (opens a webview for parameters).
   - ID: `chrome-extension-developer-tools.create`

2. **Chrome Extension: Watch Files**:

   - Description: Uses webpack to watch extension files.
   - ID: `chrome-extension-developer-tools.watch`

3. **Chrome Extension: Build Files**:

   - Description: Uses webpack to package Chrome extension for publishing.
   - ID: `chrome-extension-developer-tools.build`

## For Contribution Opportunities

We welcome contributions to this project! If you're interested in helping, feel free to take on any of the following tasks or propose your own ideas:

- **TODO**:

  - [ ] **Convert 'Create New Extension' into a Dialog/Window**: Refactor the current 'Create New ]Extension' functionality so that it opens as a dialog or window, rather than a full page.

  - [ ] **Design a New Icon for the Extension**: Create and implement a new icon to represent the extension.
  - [ ] **Customizable Project Templates**: Enable users to add their own custom templates or modify existing ones while creating a project.
  - [ ] **Add Dependency Selection**: Allow users to choose additional dependencies they would like to include during project creation.

We are open to other suggestions, so feel free to share your ideas!
