const { app, BrowserWindow, Menu } = require('electron');
const { autoUpdater, AppUpdater } = require("electron-updater");
const path = require('path');

const { menu } = require('./menu');

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

let curWindow;

const isDev = process.env.NODE_ENV !== 'development';
const isMac = process.platform == 'darwin';

// Create the main window
const createMainWindow = () => {
  const filePathToPreloid = path.resolve(__dirname, '..', 'src', 'preload.js');
  const filePathToIndexHtml = path.resolve(__dirname, '..', 'public', 'index.html');

  const mainWIndow = new BrowserWindow({
    title: 'MZTA Help',
    width: isDev ? 1000 : 1024,
    height: 768,
    webPreferences: {
      preload: filePathToPreloid,
    }
  });

  // Open DevTools if in dev mode
  if(isDev) {
    mainWIndow.webContents.openDevTools();
  }

  mainWIndow.loadFile(filePathToIndexHtml);

  curWindow = mainWIndow;
}

// App is ready
app.whenReady().then(() => {
  createMainWindow();

  // Implement Menu
  Menu.setApplicationMenu(menu);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });

  autoUpdater.checkForUpdates();
  // curWindow.showMessage(`Checking for updates. Current version ${app.getVersion()}`);
});

app.on('window-all-closed', () => {
    if (!isMac) {
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

