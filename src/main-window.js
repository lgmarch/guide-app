const { BrowserWindow } = require("electron");
const path = require("path");

const createMainWindow = (isDev) => {
    const filePathToPreloid = path.resolve(__dirname, 'preload.js');
    const filePathToIndexHtml = path.resolve(__dirname, '..', 'public', 'index.html');
  
    const mainWIndow = new BrowserWindow({
      title: 'MZTA Help',
      width: isDev ? 1000 : 1024,
      height: 768,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: true,
        preload: filePathToPreloid,
      }
    });
  
    // Open DevTools if in dev mode
    if(isDev) {
      mainWIndow.webContents.openDevTools();
    }
  
    mainWIndow.loadFile(filePathToIndexHtml);

    return mainWIndow;
}

module.exports = { createMainWindow };