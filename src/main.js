const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const { menu } = require('./menu');
const { createMainWindow } = require('./main-window');

const isDev = process.env.NODE_ENV !== 'development';
const isMac = process.platform == 'darwin';
let mainWindow;

// App is ready
app.whenReady().then(() => {
  mainWindow = createMainWindow(isDev);

  // Implement Menu
  Menu.setApplicationMenu(menu);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });

  // Remove variable from memory
  mainWindow.on('closed', () => (mainWindow = null));
});

app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit();
    }
});

// Global exception handler
process.on("uncaughtException", function (err) {
  console.log(err);
});

// *** from Menu
app.on('update', () => { 
  console.log('! Request To Update');
  // ** to renderer
  mainWindow.webContents.send('update-message', 'SAVED');
  autoUpdater.checkForUpdates();
});

autoUpdater.on("update-available", (info) => {
  let pth = autoUpdater.downloadUpdate();
  console.log('! update-available', pth);
  mainWindow.webContents.send('update-available', `Update available. Current version ${app.getVersion()}`);
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