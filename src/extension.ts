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
    if (srcIndex !== -1 && srcIndex + 1 < pathParts.length) {
        return pathParts[srcIndex + 1];
    }
    return null;
}

export function deactivate() {}