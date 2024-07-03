const { contextBridge, ipcRenderer } = require('electron');
const os = require('os');
const path = require('path');
const Toastify = require('toastify-js');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld('os', {
  homedir: () => os.homedir(),
});

contextBridge.exposeInMainWorld('pathToFile', {
  join: (...args) => path.join(...args),
});

contextBridge.exposeInMainWorld('Toastify', {
  toast: (options) => Toastify(options).showToast(),
});

contextBridge.exposeInMainWorld('updateAPI', {
  onUpdateRelease: (cb) => ipcRenderer.on('update-message', (_event, value) => cb(value)),
  onUpdateAvailable: (cb) => ipcRenderer.on('update-available', (_event, value) => cb(value)),
  onUpdateNotAvailable: (cb) => ipcRenderer.on('update-not-available', (_event, value) => cb(value)),
  onUpdateNotAvailable: (cb) => ipcRenderer.on('update-downloaded', (_event, value) => cb(value)),
  onUpdateNotAvailable: (cb) => ipcRenderer.on('update-not-available', (_event, value) => cb(value)),
  // answer from render
  // send: (channel, data) => ipcRenderer.send(channel, data),
});
