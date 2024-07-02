const { app, BrowserWindow, Menu } = require('electron');
const { autoUpdater, AppUpdater } = require('electron-updater');
const { menu } = require('./menu');
const { createMainWindow } = require('./main-window');

const isDev = process.env.NODE_ENV !== 'development';
const isMac = process.platform == 'darwin';

// App is ready
app.whenReady().then(() => {
  createMainWindow(isDev);

  // Implement Menu
  Menu.setApplicationMenu(menu);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit();
    }
});

// New Update Available
autoUpdater.on("update-available", (info) => {
  curWindow.showMessage(`Update available. Current version ${app.getVersion()}`);
  let pth = autoUpdater.downloadUpdate();
  // curWindow.showMessage(pth);
});

autoUpdater.on("update-not-available", (info) => {
  // curWindow.showMessage(`No update available. Current version ${app.getVersion()}`);
});

// Download Completion Message
autoUpdater.on("update-downloaded", (info) => {
  // curWindow.showMessage(`Update downloaded. Current version ${app.getVersion()}`);
});

autoUpdater.on("error", (info) => {
  // curWindow.showMessage(info);
});