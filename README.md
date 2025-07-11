# Closet Companion - React Native Project

This is a [**React Native**](https://reactnative.dev) project bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli). This guide will help you set up and run the app on **Android** devices.

---

## Minimum System Requirements

| Component          | Requirement                                   |
|--------------------|-----------------------------------------------|
| OS                 | Windows 10/11 (64-bit) or macOS 12+           |
| RAM                | At least **8 GB** (16 GB recommended)         |
| Storage            | Minimum **10 GB** free disk space             |
| Processor          | Intel i5 / Ryzen 5 or higher                  |
| Node.js            | v18.x or later                                |
| JDK                | JDK 11 or newer                               |
| Android Studio     | Dolphin (2021.3.1) or newer                   |

---

##  Step-by-Step Setup (Android Only)

### 1. Install Prerequisites

- **Node.js**: [Download and install Node.js v18+](https://nodejs.org)
- **Java Development Kit (JDK)**: [Install JDK 11+](https://adoptopenjdk.net/)
- **Android Studio**:
  - Download from [here](https://developer.android.com/studio)
  - During installation, ensure the following components are selected:
    - Android SDK
    - Android SDK Platform Tools
    - Android Emulator
    - Intel x86 Emulator Accelerator (HAXM) (for Intel CPUs)
  - After installation:
    - Open Android Studio → **Settings > Appearance & Behavior > System Settings > Android SDK**
    - Make sure the following are installed:
      - SDK Platforms: **Android 13 (API level 33)** or similar
      - SDK Tools: **Android SDK Build-Tools**, **NDK**, **CMake**

### 2. Set Environment Variables

Add the following to your system’s environment variables:

#### For Windows (PowerShell or `.bashrc` / `.zshrc` on macOS):

```sh
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

On Windows, `ANDROID_HOME` is usually:  
`C:\Users\<YourUsername>\AppData\Local\Android\Sdk`

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/closetcompanion.git
cd closetcompanion
```

### 2. Install Dependencies

```sh
npm install
# OR
yarn install
```

### 3. Start Metro (React Native bundler)

```sh
npm start
# OR
yarn start
```

### 4. Run Android App

Make sure an emulator is running **OR** a device is connected via USB with debugging enabled.

```sh
npm run android
# OR
yarn android
```

If everything is set up correctly, your app will launch in the emulator or connected device.

---

## Modify & Test the App

Edit the `App.tsx` file to begin customization. Changes will automatically reflect thanks to **Fast Refresh**.

To reload manually:

- **Android**: Press `R` twice or use the developer menu (`Cmd+M` on macOS / `Ctrl+M` on Windows/Linux).

---

## Troubleshooting

- Ensure Android Studio SDK is properly installed.
- Run `adb devices` to confirm your device is connected.
- Check [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting) for more issues.

---

## Project Scripts

```json
"scripts": {
  "android": "react-native run-android",
  "ios": "react-native run-ios",
  "lint": "eslint .",
  "start": "react-native start",
  "test": "jest"
}
```

---

##  Tech Stack

- **React Native** `0.79.0`
- **Redux Toolkit**, **Firebase**, **React Navigation**
- UI: **react-native-chart-kit**, **toast-message**, **image-crop-picker**


## Install React Native CLI

Before running the app, make sure the **React Native CLI** is installed globally.

```sh
npm install -g react-native-cli
```

> Note: Do **not** confuse this with `npx react-native`, which uses the CLI locally from the project. Installing it globally ensures you can use commands like `react-native run-android` directly.
