# ROS2 Launcher for VS Code

## Description
This VS Code extension allows users to **run ROS2 launch files (`.py` extensions) with a right-click**.  
It automatically opens a new terminal, **sources the workspace**, and executes the launch command.

## Features
✅ Right-click a `.py` ROS2 launch file and select **"Run ROS2 Launch File"**  
✅ Automatically **sources `install/setup.bash`** before running  
✅ Runs in a **fresh terminal instance**  
✅ Detects the package name automatically  

## Installation
1. Install from the **VS Code Marketplace** (or manually using `.vsix`).  
2. Open a ROS2 workspace in VS Code.  
3. Right-click any **launch file (`.py`)** and run it.

## Usage
1. Navigate to your **ROS2 launch file** (`*.py`).
2. Right-click and select **"Run ROS2 Launch File"**.
3. A **new terminal opens**, sources the workspace, and starts the launch.

## Requirements
- ROS2 installed  
- A properly built workspace (`colcon build`)  

## Future Updates
🔹 Support for `.launch.xml` and `.launch.yaml`  
🔹 Customizable sourcing options  
🔹 Detecting workspace automatically  

## Issues & Contributions
If you encounter any issues, feel free to open an **issue** or contribute on [GitHub](https://github.com/yourusername/ros2-launcher-vscode).

---
