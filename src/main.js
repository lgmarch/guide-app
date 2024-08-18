const { app, BrowserWindow, Menu } = require('electron');
const { autoUpdater } = require('electron-updater');
const { menu } = require('./menu');
const { createMainWindow } = require('./main-window');

let mainWindow;

// App is ready
app.whenReady().then(() => {
  mainWindow = createMainWindow();

  // Implement Menu
  Menu.setApplicationMenu(menu);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });

  // Remove variable from memory
  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  });
});

app.on('window-all-closed', () => {
    if (!process.platform === 'darwin') {
      app.quit();
    }
});

// Global exception handler
process.on("uncaughtException", function (err) {
  console.log(err);
});

// autoUpdater.autoDownload = true;
// autoUpdater.autoInstallOnAppQuit = true;

// *** from Menu
app.on('update-click', () => { 
  console.log('! Request To Update From Menu To Main');
  // ** to renderer
  let check = autoUpdater.checkForUpdates();
  mainWindow.webContents.send('update-message', `Current version ${app.getVersion()}. No update required`);
  console.log('check', check);
});

// New Release available
autoUpdater.on("update-available", (info) => {
  let pth = autoUpdater.downloadUpdate();
  console.log('! update-available', pth);
  mainWindow.webContents.send('update-available', 'update-available');
});
  
autoUpdater.on('update-not-available', (info) => {
  console.log('! update-not-available', info);
  mainWindow.webContents.send('update-not-available', 'update-not-available');
});

// Download Completion Message
  autoUpdater.on("update-downloaded", (info) => {
  console.log('! update-downloaded', info);
  mainWindow.webContents.send('update-downloaded', 'update-downloaded');
});

autoUpdater.on("error", (info) => {
  console.log('! error ', info);
  mainWindow.webContents.send('update-error', 'update-error');
});