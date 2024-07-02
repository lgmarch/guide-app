const { app, BrowserWindow } = require('electron');
const path = require('path');
const { autoUpdater, AppUpdater } = require("electron-updater");

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

let curWindow;

const createWindow = () => {
  const filePathToPreloid = path.resolve(__dirname, '..', 'src', 'preload.js');
  const filePathToIndex = path.resolve(__dirname, '..', 'public', 'index.html');

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: filePathToPreloid,
    }
  });
  win.loadFile(filePathToIndex);

  curWindow = win;
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });

  autoUpdater.checkForUpdates();
  // curWindow.showMessage(`Checking for updates. Current version ${app.getVersion()}`);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});

/*New Update Available*/
autoUpdater.on("update-available", (info) => {
  curWindow.showMessage(`Update available. Current version ${app.getVersion()}`);
  let pth = autoUpdater.downloadUpdate();
  // curWindow.showMessage(pth);
});

autoUpdater.on("update-not-available", (info) => {
  // curWindow.showMessage(`No update available. Current version ${app.getVersion()}`);
});

/*Download Completion Message*/
autoUpdater.on("update-downloaded", (info) => {
  // curWindow.showMessage(`Update downloaded. Current version ${app.getVersion()}`);
});

autoUpdater.on("error", (info) => {
  // curWindow.showMessage(info);
});

