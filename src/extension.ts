import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand(
        "ros2-launcher.runLaunchFile",
        (uri: vscode.Uri) => {
            runROS2LaunchFile(uri.fsPath);
        }
    );

    context.subscriptions.push(disposable);
}

function runROS2LaunchFile(filePath: string) {
    const launchFileName = filePath.split("/").pop();
    const terminalName = launchFileName ? launchFileName.replace(".launch.py", "") : "ROS2 Launch";
    const terminal = vscode.window.createTerminal(terminalName);
    terminal.show();
    terminal.sendText("source install/setup.bash"); // Ensure workspace is sourced
    const packageName = getPackageName(filePath);
    if (packageName && launchFileName) {
        terminal.sendText(`ros2 launch ${packageName} ${launchFileName}`);
    } else {
        vscode.window.showErrorMessage("Could not determine package name.");
    }
}

function getPackageName(filePath: string): string | null {
    const pathParts = filePath.split("/");
    const srcIndex = pathParts.indexOf("src");
    if (srcIndex === -1) {
        return null;
    }

    // Start from the src directory and look for the package directory
    for (let i = srcIndex + 1; i < pathParts.length; i++) {
        const currentPath = pathParts.slice(0, i + 1).join("/");
        try {
            // Check if this directory contains a package.xml file
            const fs = require('fs');
            if (fs.existsSync(`${currentPath}/package.xml`)) {
                return pathParts[i];
            }
        } catch (error) {
            continue;
        }
    }
    return null;
}

export function deactivate() {}