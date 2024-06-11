const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('preload', {
  tree: () => process.versions.node,
})